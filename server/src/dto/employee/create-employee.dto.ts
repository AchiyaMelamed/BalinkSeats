import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber } from 'class-validator';

class CreateEmployeeDto {
  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber('IS')
  phone: string;
}

export default CreateEmployeeDto;
