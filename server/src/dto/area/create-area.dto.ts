import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({ description: 'ID of the office the area belongs to' })
  office: string;

  @ApiProperty()
  description: string;
}
