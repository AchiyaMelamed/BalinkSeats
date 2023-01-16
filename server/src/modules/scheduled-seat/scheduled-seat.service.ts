import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduledSeatDocument } from 'src/schemas';

import { CreateScheduledSeatDto } from 'src/dto';

import { ScheduledSeat } from 'src/schemas';
import { SeatService } from 'src/modules/seat/seat.service';
import { EmployeeService } from 'src/modules/employee/employee.service';
import handleInvalidValueError from 'utils/errorHandling/handleGetById';

@Injectable()
export class ScheduledSeatService {
  constructor(
    @InjectModel(ScheduledSeat.name)
    private scheduledSeatModel: Model<ScheduledSeatDocument>,
    @Inject(SeatService) private seatService: SeatService,
    @Inject(EmployeeService) private employeeService: EmployeeService,
  ) {}

  async createScheduled(createScheduledSeatDto: CreateScheduledSeatDto) {
    const startDate = new Date(createScheduledSeatDto.startDate);
    const endDate = new Date(createScheduledSeatDto.endDate);
    if (endDate < startDate) {
      return {
        ERROR: 'End date cannot be before start date',
      };
    }

    const seat = await this.seatService.findSeat(
      Object.assign({
        id: createScheduledSeatDto.seat,
        number: createScheduledSeatDto.seatNumber,
      }),
    );

    const employee = await this.employeeService.findEmployee(
      Object.assign({
        id: createScheduledSeatDto.employee,
        email: createScheduledSeatDto.employeeEmail,
      }),
    );

    if (seat.ERROR) {
      return seat;
    }
    if (employee.ERROR) {
      return employee;
    }

    const newScheduledSeat = new this.scheduledSeatModel({
      seat,
      employee,
      startDate: createScheduledSeatDto.startDate,
      endDate: createScheduledSeatDto.endDate,
    });
    return newScheduledSeat.save();
  }

  findAllScheduled() {
    return this.scheduledSeatModel.find().exec();
  }

  async findScheduledById(id: string) {
    try {
      const res = await this.scheduledSeatModel.findById(id);
      if (!res) {
        throw new Error('ScheduledSeat not found');
      }
      return res;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async findBySeat({ seatId, seatNumber }) {
    const seat = await this.seatService.findSeat(
      Object.assign({ id: seatId, number: seatNumber }),
    );
    if (seat.ERROR) {
      return seat;
    }
    return this.scheduledSeatModel.find({ seat: seat }).exec();
  }

  async findByEmployee({
    employeeId,
    employeeEmail,
    employeeFirstName,
    employeeLastName,
  }) {
    const employee = await this.employeeService.findEmployee(
      Object.assign({
        id: employeeId,
        email: employeeEmail,
        firstName: employeeFirstName,
        lastName: employeeLastName,
      }),
    );
    if (employee.ERROR) {
      return employee;
    }
    return this.scheduledSeatModel.find({ employee }).exec();
  }

  async findByDate({ startDate, endDate }) {
    if (startDate && endDate)
      return this.scheduledSeatModel.find({
        startDate: { $gte: startDate },
        endDate: { $lte: endDate },
      });
    if (startDate)
      return this.scheduledSeatModel.find({
        startDate: { $gte: startDate },
      });
    if (endDate)
      return this.scheduledSeatModel.find({
        endDate: { $lte: endDate },
      });
  }

  async findScheduled({
    id,
    seat,
    seatNumber,
    employee,
    employeeEmail,
    employeeFirstName,
    employeeLastName,
    startDate,
    endDate,
  }) {
    try {
      const res = id
        ? await this.findScheduledById(id)
        : seat || seatNumber
        ? await this.findBySeat({ seatId: seat, seatNumber })
        : employee || employeeFirstName || employeeLastName || employeeEmail
        ? await this.findByEmployee({
            employeeId: employee,
            employeeEmail,
            employeeFirstName,
            employeeLastName,
          })
        : startDate || endDate
        ? await this.findByDate({ startDate, endDate })
        : await this.findAllScheduled();
      return res;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async deleteScheduledById(id: string) {
    try {
      const scheduled = await this.scheduledSeatModel.findByIdAndDelete(id);
      if (!scheduled) {
        throw new Error('ScheduledSeat not found');
      }
      return scheduled;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }
}
