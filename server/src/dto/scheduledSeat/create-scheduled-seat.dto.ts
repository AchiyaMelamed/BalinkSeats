import { ApiProperty } from '@nestjs/swagger';
import { MinDate } from 'class-validator';

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

  @ApiProperty({
    description:
      'The employee email, Must have this property or employee property',
  })
  employeeEmail: string;

  @MinDate(new Date())
  @ApiProperty({
    description: 'The start date of the scheduled seat',
    example: 'YYYY-MM-DD',
  })
  startDate: Date;

  @MinDate(new Date())
  @ApiProperty({
    description: 'The end date of the scheduled seat',
    example: 'YYYY-MM-DD',
  })
  endDate: Date;
}

export default CreateScheduledSeatDto;
