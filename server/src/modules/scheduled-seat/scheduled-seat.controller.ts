import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ScheduledSeatService } from './scheduled-seat.service';
import { CreateScheduledSeatDto } from 'src/dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';

@ApiTags('ScheduledSeat')
@Controller('scheduled')
@UseGuards(JwtGuard)
export class ScheduledSeatController {
  constructor(private readonly scheduledSeatService: ScheduledSeatService) {}

  @Get(':id')
  async getScheduledById(@Param('id') id: string) {
    return await this.scheduledSeatService.findScheduledById(id);
  }

  @Get()
  async getScheduled(
    @Query('id') id: string,
    @Query('seat') seat: string,
    @Query('seatNumber') seatNumber: string,
    @Query('employee') employee: string,
    @Query('employeeEmail') employeeEmail: string,
    @Query('employeeFirstName') employeeFirstName: string,
    @Query('employeeLastName') employeeLastName: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
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

  @Delete(':id')
  async deleteScheduledById(@Param('id') id: string) {
    return this.scheduledSeatService.deleteScheduledById(id);
  }
}
