import { ApiProperty } from '@nestjs/swagger';

export class CreateOfficeDto {
  @ApiProperty({ description: 'Number of the office' })
  number: number;

  @ApiProperty()
  description: string;
}
