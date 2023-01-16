import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateSeatDto } from 'src/dto';
import { Row, RowDocument, Seat, SeatDocument } from 'src/schemas';
import handleInvalidValueError from 'utils/errorHandling/handleGetById';
import { generateNumber } from 'utils/generateNumbers/generateNumbers';
import { RowService } from 'src/modules/row/row.service';
import { decreaseChildByOne } from 'utils/DBUpdates/deceaseChildSum';

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat.name) private seatModel: Model<SeatDocument>,
    @InjectModel(Row.name) private rowModel: Model<RowDocument>,
    @Inject(RowService) private rowService: RowService,
  ) {}

  async findAllSeats() {
    return this.seatModel.find().exec();
  }

  async findSeat({ id, number, description, sitting, row, rowNumber }) {
    try {
      const res = id
        ? await this.findSeatById(id)
        : number
        ? await this.seatModel.findOne({ number }).exec()
        : description
        ? await this.seatModel.find({ description }).exec()
        : sitting
        ? await this.seatModel.find({ sitting }).exec()
        : row || rowNumber
        ? await this.findByRow({ rowId: row, rowNumber })
        : this.findAllSeats();
      if (!res) {
        return { message: 'No seat found' };
      }
      return res;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async findByRow({ rowId, rowNumber }) {
    const row = await this.rowService.findRow(
      Object.assign({ id: rowId, number: rowNumber }),
    );
    if (row.ERROR) {
      return row;
    }
    return this.seatModel.find({ row }).exec();
  }

  async findSeatById(id: string) {
    try {
      return this.seatModel.findById(id).exec();
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async createSeat(createSeatDto: CreateSeatDto) {
    const row = await this.rowModel.findById(createSeatDto.row).exec();
    if (!row) {
      throw new Error('Row not found');
    }
    const seatNumber = generateNumber(row, row.sumSeats + 1);
    const createdSeat = new this.seatModel({
      row,
      number: seatNumber,
      sitting: createSeatDto.sitting,
      description: createSeatDto.description,
    });
    try {
      const res = await createdSeat.save();
      row.sumSeats++;
      row.save();
      return res;
    } catch (error) {
      console.log(createdSeat);
      throw new Error(error);
    }
  }

  async deleteSeatById(id: string) {
    try {
      const seat = await this.seatModel.findByIdAndDelete(id).exec();
      if (!seat) {
        return { message: 'Seat not found' };
      }
      const row = await this.rowModel.findById(seat.row).exec();

      await decreaseChildByOne(row, 'sumSeats');

      return seat;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async deleteSeat({ number }) {
    try {
      const seat = await this.seatModel.findOneAndDelete({ number }).exec();
      const row = await this.rowModel.findById(seat.row).exec();

      await decreaseChildByOne(row, 'sumSeats');

      return seat;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }
}
