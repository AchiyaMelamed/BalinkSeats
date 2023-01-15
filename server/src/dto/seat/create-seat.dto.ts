import { ApiProperty } from '@nestjs/swagger';

class CreateSeatDto {
  @ApiProperty({ description: 'ID of the row the seat belongs to' })
  row: string;

  @ApiProperty({ description: 'seat description', required: false })
  description: string;

  @ApiProperty({ description: 'if empty: null, else: employee ID' })
  sitting: string;
}

export default CreateSeatDto;
