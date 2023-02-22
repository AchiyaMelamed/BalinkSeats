import { Module } from '@nestjs/common';
import { ScheduledSeatService } from './scheduled-seat.service';
import { ScheduledSeatController } from './scheduled-seat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduledSeat, ScheduledSeatSchema } from '../../schemas';
import { SeatModule } from '../seat/seat.module';
import { EmployeeModule } from '../employee/employee.module';
import { DATABASE_URL } from '../../constants';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URL || 'mongodb://127.0.0.1:27017/seats'),
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
