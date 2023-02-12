import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument, User, UserDocument } from '../../schemas';

import { EmployeeService } from '../employee/employee.service';
import { UserDetails } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user.id,
      name: user.employee.firstName + ' ' + user.employee.lastName,
      email: user.employee.email,
      level: user.level,
      isVerified: user.isVerified,
    };
  }

  async createUser(
    employee: Employee,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      employee,
      password: hashedPassword,
      level: employee.level,
    });
    return newUser.save();
  }

  async findUserById(id: string): Promise<UserDetails | any> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return { ERROR: 'User not found' };
    return this._getUserDetails(user);
  }

  async findUserByEmployee(employee: Employee): Promise<UserDocument | null> {
    return this.userModel.findOne({ employee }).exec();
  }

  async updateUser(
    id: string,
    user: User,
  ): Promise<UserDetails | { ERROR: string } | any> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user).exec();
    if (!updatedUser) return { ERROR: 'User not found' };
    return this._getUserDetails(updatedUser);
  }
}
