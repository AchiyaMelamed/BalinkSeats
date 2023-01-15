import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeatModule } from './seat/seat.module';
import { EmployeeModule } from './employee/employee.module';
import { ScheduledSeatModule } from './scheduled-seat/scheduled-seat.module';
import { OfficeModule } from './office/office.module';
import { AreaModule } from './area/area.module';
import { RowModule } from './row/row.module';

@Module({
  imports: [SeatModule, EmployeeModule, ScheduledSeatModule, OfficeModule, AreaModule, RowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
