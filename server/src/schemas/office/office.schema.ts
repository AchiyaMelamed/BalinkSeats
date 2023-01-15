import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OfficeDocument = HydratedDocument<Office>;

@Schema()
export class Office {
  @Prop({ required: true, unique: true })
  number: string;
  @Prop({ required: false })
  description: string;
  @Prop({ required: true })
  sumAreas: number;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
