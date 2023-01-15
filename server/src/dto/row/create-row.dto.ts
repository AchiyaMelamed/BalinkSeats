import { ApiProperty } from '@nestjs/swagger';

export class CreateRowDto {
  @ApiProperty({ description: 'ID of the area the row belongs to' })
  area: string;

  @ApiProperty()
  description: string;
}
