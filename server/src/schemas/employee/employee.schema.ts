import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: false })
  phone: string;
  @Prop({ required: true, default: 'Employee' })
  level: 'Admin' | 'Employee';
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
