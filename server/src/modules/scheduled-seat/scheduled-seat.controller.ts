import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScheduledSeatService } from './scheduled-seat.service';
import { CreateScheduledSeatDto } from 'src/dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ScheduledSeat')
@Controller('scheduled')
export class ScheduledSeatController {
  constructor(private readonly scheduledSeatService: ScheduledSeatService) {}

  @Get(':id')
  async getScheduledById(@Param('id') id: string) {
    return await this.scheduledSeatService.findScheduledById(id);
  }

  @Get()
  async getScheduled(
    @Body('id') id: string,
    @Body('seat') seat: string,
    @Body('seatNumber') seatNumber: string,
    @Body('employee') employee: string,
    @Body('employeeEmail') employeeEmail: string,
    @Body('employeeFirstName') employeeFirstName: string,
    @Body('employeeLastName') employeeLastName: string,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date,
  ) {
    return await this.scheduledSeatService.findScheduled({
      id,
      seat,
      seatNumber,
      employee,
      employeeFirstName,
      employeeLastName,
      employeeEmail,
      startDate,
      endDate,
    });
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create a new scheduled seat' })
  async createScheduled(
    @Body() createScheduledSeatDto: CreateScheduledSeatDto,
  ) {
    return await this.scheduledSeatService.createScheduled(
      createScheduledSeatDto,
    );
  }
}
