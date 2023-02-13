import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsDate, IsEmail, MinDate } from 'class-validator';

@ApiTags('ScheduledSeats')
class CreateScheduledSeatDto {
  @ApiProperty({
    description: 'The seat ID, must have this property or seatNumber property',
    required: false,
  })
  seat: string;

  @ApiProperty({
    description: 'The seat number, Must have this property or seat property',
    required: false,
  })
  seatNumber: string;

  @ApiProperty({
    description:
      'The employee ID, Must have this property or employeeEmail property',
  })
  employee: string;

  @IsEmail()
  @ApiProperty({
    description:
      'The employee email, Must have this property or employee property',
  })
  employeeEmail: string;

  @IsDate()
  @MinDate(new Date())
  @ApiProperty({
    description: 'The start date of the scheduled seat',
    example: 'YYYY-MM-DD',
  })
  startDate: Date;

  @IsDate()
  @MinDate(new Date())
  @ApiProperty({
    description: 'The end date of the scheduled seat',
    example: 'YYYY-MM-DD',
  })
  endDate: Date;

  @ApiProperty({
    description: 'The days of the week the seat is scheduled',
    example: ['Monday', 'Tuesday'],
    required: false,
  })
  repeatEvery: string[];
}

export default CreateScheduledSeatDto;
