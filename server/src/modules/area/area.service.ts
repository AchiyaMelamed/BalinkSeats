import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OfficeService } from '../office/office.service';

import { Area, AreaDocument, Office, OfficeDocument } from '../../schemas';
import handleInvalidValueError from '../../../utils/errorHandling/handleGetById';
import { generateNumber } from '../../../utils/generateNumbers/generateNumbers';
import { decreaseChildByOne } from '../../../utils/DBUpdates/deceaseChildSum';
import { CreateAreaDto } from '../../dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectModel(Area.name) private readonly areaModel: Model<AreaDocument>,
    @InjectModel(Office.name)
    private readonly officeModel: Model<OfficeDocument>,
    @Inject(OfficeService) private readonly officeService: OfficeService,
  ) {}

  async findAreaById(id: string): Promise<any> {
    try {
      const res = await this.areaModel.findById(id);
      if (!res) {
        throw new Error('Area not found');
      }
      return res;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async findAllAreas() {
    return this.areaModel.find();
  }

  async findArea({ office, id, number, officeNumber }) {
    try {
      const res = id
        ? await this.findAreaById(id)
        : number
        ? await this.areaModel.find({ number })
        : office || officeNumber
        ? await this.findByOffice({ officeId: office, officeNumber })
        : await this.findAllAreas();
      return res;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async findByOffice({ officeId, officeNumber }: any) {
    const office = await this.officeService.findOffice(
      Object.assign({
        id: officeId,
        number: officeNumber,
      }),
    );
    if (office.ERROR) {
      return office;
    }
    return this.areaModel.find({ office }).exec();
  }

  async createArea(createAreaDto: CreateAreaDto) {
    const office = await this.officeModel.findById(createAreaDto.office).exec();
    if (!office) {
      throw new Error('Office not found');
    }
    const areaNumber = generateNumber(office, office.sumAreas + 1);
    const createdArea = new this.areaModel({
      office,
      number: areaNumber,
      description: createAreaDto.description,
      position: createAreaDto.position,
      sumRows: 0,
    });
    try {
      const res = await createdArea.save();
      office.sumAreas++;
      office.save();
      return res;
    } catch (error) {
      return { ERROR: error.message };
    }
  }

  async deleteAreaById(id: string) {
    try {
      const area = await this.areaModel.findByIdAndDelete(id).exec();
      if (!area) {
        return { message: 'Area not found' };
      }
      const office = await this.officeModel.findById(area.office).exec();

      await decreaseChildByOne(office, 'sumAreas');

      return area;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }

  async deleteArea({ number }) {
    try {
      const area = await this.areaModel.findOneAndDelete({ number }).exec();
      if (!area) {
        return { message: 'Area not found' };
      }
      const office = await this.officeModel.findById(area.office).exec();

      await decreaseChildByOne(office, 'sumAreas');

      return area;
    } catch (error) {
      return await handleInvalidValueError(error);
    }
  }
}
