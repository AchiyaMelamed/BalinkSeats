import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { DayOfWeek } from 'src/types/DayOfWeek';
import { Employee } from '../employee/employee.schema';
import { Seat } from '../seat/seat.schema';

export type ScheduledSeatDocument = HydratedDocument<ScheduledSeat>;

@Schema()
export class ScheduledSeat {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Seat' })
  seat: Seat;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  })
  employee: Employee;
  @Prop({ required: true })
  startDate: Date;
  @Prop({ required: true })
  endDate: Date;
  @Prop({ required: false })
  repeatEvery: DayOfWeek[];
}

export const ScheduledSeatSchema = SchemaFactory.createForClass(ScheduledSeat);
