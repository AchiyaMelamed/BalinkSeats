import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: 'email of an employee' })
  email: string;
  @ApiProperty({ description: 'first name of an employee for validating' })
  firstName: string;
  @ApiProperty({ description: 'last name of an employee for validating' })
  lastName: string;
  @ApiProperty()
  password: string;
}
