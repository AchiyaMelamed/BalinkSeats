import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeatModule } from './modules/seat/seat.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ScheduledSeatModule } from './modules/scheduled-seat/scheduled-seat.module';
import { OfficeModule } from './modules/office/office.module';
import { AreaModule } from './modules/area/area.module';
import { RowModule } from './modules/row/row.module';

@Module({
  imports: [
    SeatModule,
    EmployeeModule,
    ScheduledSeatModule,
    OfficeModule,
    AreaModule,
    RowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
