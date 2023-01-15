import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Office } from '../office/office.schema';

export type AreaDocument = HydratedDocument<Area>;

@Schema()
export class Area {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Office' })
  office: Office;
  @Prop({ required: true, unique: true })
  number: string;
  @Prop({ required: true, unique: true })
  description: string;
  @Prop({ required: true })
  sumRows: number;
}

export const AreaSchema = SchemaFactory.createForClass(Area);
