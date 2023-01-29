import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: 'email of an employee' })
  email: string;
  @ApiProperty()
  password: string;
}
