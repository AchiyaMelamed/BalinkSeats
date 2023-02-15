import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';

import * as bcrypt from 'bcrypt';
import * as sgMail from '@sendgrid/mail';

import { LoginUserDto } from '../../dto';
import { RegisterUserDto } from '../../dto';
import { EmployeeService } from '../employee/employee.service';
import { UserDetails } from '../user/user.interface';
import { ConfigService } from '@nestjs/config';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(EmployeeService) private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async registerUser(
    user: Readonly<RegisterUserDto>,
  ): Promise<UserDetails | { ERROR: string }> {
    const { email, password } = user;
    const employee = await this.employeeService.findEmployee({
      email,
    });
    if (!employee || employee.ERROR)
      return (
        { ERROR: employee?.ERROR } || {
          ERROR: 'No employee found with that email',
        }
      );

    const existingUser = await this.userService.findUserByEmployee(employee);
    if (existingUser) return { ERROR: 'Email already in use' };

    const firstName = employee.firstName;
    const lastName = employee.lastName;
    if (firstName !== user.firstName || lastName !== user.lastName)
      return {
        ERROR:
          'First or/and last name do not match the employee record for this email',
      };

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.createUser(employee, hashedPassword);
    // Create token and send a link containing the token to the user's email
    // when link clicked make the user verified in DB
    const token = this.jwtService.sign({ user: newUser });
    try {
      await this.sendVerificationEmail({
        email: newUser.employee.email,
        token,
      });
    } catch (error) {
      newUser.delete();
      throw new Error(error);
    }
    return this.userService._getUserDetails(newUser);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | any> {
    const employee = await this.employeeService.findEmployee({
      email,
    });
    if (!employee || employee.ERROR)
      return { ERROR: employee?.ERROR } || { ERROR: 'User not found' };

    const user = await this.userService.findUserByEmployee(employee);
    if (!user) return { ERROR: 'User not found' };

    const isValid = await this.validatePassword(password, user.password);
    if (!isValid) return { ERROR: 'Invalid password' };

    return this.userService._getUserDetails(user);
  }

  async verifyUser(token: string): Promise<{ ERROR: string } | any> {
    const { user } = await this.jwtService.verifyAsync(token);
    if (!user) return { ERROR: 'Invalid token' };
    user.isVerified = true;
    const userDetails = await this.userService.updateUser(user._id, user);
    if (userDetails?.ERROR) return { ERROR: userDetails.ERROR };
    return { Success: 'User verified' };
  }

  async sendVerificationEmail({
    email,
    token,
  }: {
    email: string;
    token: string;
  }) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'achiyam@balink.net', // Change to your recipient
      from: 'achiyam@balink.net', // Change to your verified sender
      subject: 'BalinkSeats Verification Email',
      text: `Please click the link below to verify your email address:\nhttp://localhost:3000/api/auth/verify/${token}`,
      html: `<strong>Please click the link below to verify your email address:<br/>http://localhost:3000/api/auth/verify/${token}</strong>`,
    };
    return sgMail.send(msg);
  }

  async loginUser(existingUser: LoginUserDto): Promise<
    | {
        token: string;
        name: string;
        email: string;
        level: 'Admin' | 'Employee' | undefined;
      }
    | { ERROR: string }
  > {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (user?.ERROR) return { ERROR: user.ERROR };
    if (!user.isVerified) return { ERROR: 'User not verified' };

    const jwt = await this.jwtService.signAsync({ user });
    return {
      token: jwt,
      email,
      name: user.name,
      level: user?.level,
    };
  }
}
