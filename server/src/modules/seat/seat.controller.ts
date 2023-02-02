import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from '../../dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Seat')
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get()
  getSeat(
    @Query('id') id: string,
    @Query('number') number: number,
    @Query('description') description: string,
    @Query('sitting') sitting: string,
    @Query('row') row: string,
    @Query('rowNumber') rowNumber: string,
  ): object {
    if (!id && !number && !description && !sitting && !row && !rowNumber) {
      return this.seatService.findAllSeats();
    }
    return this.seatService.findSeat({
      id,
      number,
      description,
      sitting,
      row,
      rowNumber,
    });
  }

  @Get(':id')
  getSeatById(@Param('id') id: string): object {
    return this.seatService.findSeatById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create a new seat' })
  createSeat(@Body() createSeatDto: CreateSeatDto): object {
    return this.seatService.createSeat(createSeatDto);
  }

  @Delete(':id')
  deleteSeatById(@Param('id') id: string): object {
    return this.seatService.deleteSeatById(id);
  }

  @Delete()
  deleteSeat(@Body('number') number: number): object {
    return this.seatService.deleteSeat({ number });
  }
}
