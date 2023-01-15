import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOfficeDto } from 'src/dto';
import { Office, OfficeDocument } from 'src/schemas';
import handleGetById from 'utils/errorHandling/handleGetById';

import { numberToString } from 'utils/generateNumbers/generateNumbers';

@Injectable()
export class OfficeService {
  constructor(
    @InjectModel(Office.name) private officeModel: Model<OfficeDocument>,
  ) {}

  async createOffice(createOfficeDto: CreateOfficeDto) {
    const { number } = createOfficeDto;
    const office = {
      ...createOfficeDto,
      number: numberToString(number),
      sumAreas: 0,
    };
    return new this.officeModel(office).save();
  }

  async findAllOffices() {
    return this.officeModel.find().exec();
  }

  async findOffice({ id, number }): Promise<any> {
    try {
      const res = id
        ? await this.officeModel.findById(id).exec()
        : await this.officeModel.findOne({ number }).exec();
      if (!res) {
        throw new Error('Office not found');
      }
      return res;
    } catch (error) {
      return await handleGetById(error);
    }
  }

  async findOfficeById(id: string): Promise<any> {
    try {
      const res = await this.officeModel.findById(id);
      if (!res) {
        throw new Error('Office not found');
      }
      return res;
    } catch (error) {
      return await handleGetById(error);
    }
  }
}
