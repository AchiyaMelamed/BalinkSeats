import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';

import { JwtStrategy } from './guards/jwt.strategy';
import { EmployeeModule } from '../employee/employee.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    EmployeeModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'kindOfVegetable',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
})
export class AuthModule {}
