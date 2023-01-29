import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'email of an employee' })
  email: string;
  @ApiProperty()
  password: string;
}
