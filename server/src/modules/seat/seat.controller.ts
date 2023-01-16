import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from 'src/dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Seat')
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get()
  getSeat(
    @Body('id') id: string,
    @Body('number') number: number,
    @Body('description') description: string,
    @Body('sitting') sitting: string,
    @Body('row') row: string,
    @Body('rowNumber') rowNumber: string,
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
