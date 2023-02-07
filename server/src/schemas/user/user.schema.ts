import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Employee } from '../employee/employee.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  employee: Employee;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, default: 'Employee' })
  level: 'Admin' | 'Employee';
}

export const UserSchema = SchemaFactory.createForClass(User);
