import { Module } from '@nestjs/common';
import { ScheduledSeatService } from './scheduled-seat.service';
import { ScheduledSeatController } from './scheduled-seat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ScheduledSeat,
  ScheduledSeatSchema,
} from 'src/schemas/scheduledSeat/scheduledSeat.schema';
import { SeatModule } from 'src/seat/seat.module';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/seats'),
    MongooseModule.forFeature([
      { name: ScheduledSeat.name, schema: ScheduledSeatSchema },
    ]),
    SeatModule,
    EmployeeModule,
  ],
  controllers: [ScheduledSeatController],
  providers: [ScheduledSeatService],
})
export class ScheduledSeatModule {}
