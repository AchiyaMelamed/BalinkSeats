import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Employee } from '../employee/employee.schema';
import { Row } from '../row/row.schema';

export type SeatDocument = HydratedDocument<Seat>;

@Schema()
export class Seat {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Row' })
  row: Row;
  @Prop({ required: true, unique: true })
  number: string;
  @Prop({ required: false })
  description: string;
  @Prop({
    nullable: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  })
  sitting: Employee;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
