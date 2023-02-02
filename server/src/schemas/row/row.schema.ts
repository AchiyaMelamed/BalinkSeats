import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Area } from '../area/area.schema';

export type RowDocument = HydratedDocument<Row>;

@Schema()
export class Row {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Area' })
  area: Area;
  @Prop({ required: true, unique: true })
  number: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  sumSeats: number;
  @Prop({ required: true, unique: true })
  position: [number, number];
  @Prop({
    require: true,
    default: 'vertical',
    options: ['vertical', 'horizontal'],
  })
  orientation: string;
}

export const RowSchema = SchemaFactory.createForClass(Row);
