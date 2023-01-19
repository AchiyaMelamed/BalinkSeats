import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { RowService } from './row.service';
import { CreateRowDto } from 'src/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Row')
@Controller('row')
export class RowController {
  constructor(private readonly rowService: RowService) {}

  @Get(':id')
  getRowById(@Param('id') id: string) {
    return this.rowService.findRowById(id);
  }

  @Get()
  getRow(
    @Query('id') id: string,
    @Query('number') number: number,
    @Query('area') area: string,
    @Query('areaNumber') areaNumber: string,
  ) {
    if (!id && !number && !area && !areaNumber) {
      return this.rowService.findAllRows();
    }
    return this.rowService.findRow({
      id,
      number,
      area,
      areaNumber,
    });
  }

  @Post()
  createRow(@Body() createRowDto: CreateRowDto) {
    return this.rowService.createRow(createRowDto);
  }

  @Delete(':id')
  deleteRowById(@Param('id') id: string) {
    return this.rowService.deleteRowById(id);
  }

  @Delete()
  deleteRow(@Body('number') number: number) {
    return this.rowService.deleteRow({ number });
  }
}
