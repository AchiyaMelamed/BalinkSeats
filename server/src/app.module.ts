import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeatModule } from './modules/seat/seat.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ScheduledSeatModule } from './modules/scheduled-seat/scheduled-seat.module';
import { OfficeModule } from './modules/office/office.module';
import { AreaModule } from './modules/area/area.module';
import { RowModule } from './modules/row/row.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.sendgrid.env',
      isGlobal: true,
    }),
    SeatModule,
    EmployeeModule,
    ScheduledSeatModule,
    OfficeModule,
    AreaModule,
    RowModule,
    SeatModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
