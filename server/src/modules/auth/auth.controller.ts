import { Controller, Post, Body } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';

import { RegisterUserDto } from 'src/dto/auth/register-user.dto';
import { UserDetails } from '../user/user.interface';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(
    @Body() user: RegisterUserDto,
  ): Promise<UserDetails | { ERROR: string }> {
    return this.authService.registerUser(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(
    @Body() user: LoginUserDto,
  ): Promise<{ token: string } | { ERROR: string }> {
    return this.authService.loginUser(user);
  }
}
