import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OfficeService } from 'src/office/office.service';

import { Area, AreaDocument, Office, OfficeDocument } from 'src/schemas';
import handleGetById from 'utils/errorHandling/handleGetById';
import { generateNumber } from 'utils/generateNumbers/generateNumbers';
import { CreateAreaDto } from '../dto/area/create-area.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectModel(Area.name) private areaModel: Model<AreaDocument>,
    @InjectModel(Office.name) private officeModel: Model<OfficeDocument>,
    @Inject(OfficeService) private officeService: OfficeService,
  ) {}

  async findAreaById(id: string): Promise<any> {
    try {
      const res = await this.areaModel.findById(id);
      if (!res) {
        throw new Error('Area not found');
      }
      return res;
    } catch (error) {
      return await handleGetById(error);
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
      return await handleGetById(error);
    }
  }

  async findByOffice({ officeId, officeNumber }) {
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
}
