import { Module } from '@nestjs/common';
import { ScheduledSeatService } from './scheduled-seat.service';
import { ScheduledSeatController } from './scheduled-seat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ScheduledSeat,
  ScheduledSeatSchema,
} from 'src/schemas/scheduled-seat/scheduled-seat.schema';
import { SeatModule } from 'src/modules/seat/seat.module';
import { EmployeeModule } from 'src/modules/employee/employee.module';

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
