import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AreaService } from './area.service';
import { CreateAreaDto } from '../../dto';

@ApiTags('Area')
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get(':id')
  async getAreaById(@Param('id') id: string) {
    return await this.areaService.findAreaById(id);
  }

  @Get()
  async getArea(
    @Query('office') office: string,
    @Query('id') id: string,
    @Query('number') number: string,
    @Query('officeNumber') officeNumber: string,
  ) {
    if (!office && !id && !number && !officeNumber) {
      return await this.areaService.findAllAreas();
    }
    return await this.areaService.findArea({
      office,
      id,
      number,
      officeNumber,
    });
  }

  @Post()
  async createArea(@Body() createAreaDto: CreateAreaDto) {
    return await this.areaService.createArea(createAreaDto);
  }

  @Delete(':id')
  async deleteAreaById(@Param('id') id: string) {
    return await this.areaService.deleteAreaById(id);
  }

  @Delete()
  async deleteArea(@Body('number') number: string) {
    return await this.areaService.deleteArea({ number });
  }
}
