import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { CreateOfficeDto } from '../dto/office/create-office.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Office')
@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get(':id')
  getOfficeById(@Param('id') id: string) {
    return this.officeService.findOfficeById(id);
  }

  @Get()
  getOffice(@Body('id') id: string, @Body('number') number: number) {
    if (!id && !number) {
      return this.officeService.findAllOffices();
    }
    return this.officeService.findOffice({ id, number });
  }

  @Post()
  createOffice(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officeService.createOffice(createOfficeDto);
  }
}
