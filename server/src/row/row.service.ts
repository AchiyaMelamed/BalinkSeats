import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AreaService } from 'src/area/area.service';
import { Area, AreaDocument, Row, RowDocument } from 'src/schemas';
import handleGetById from 'utils/errorHandling/handleGetById';
import { generateNumber } from 'utils/generateNumbers/generateNumbers';
import { CreateRowDto } from '../dto/row/create-row.dto';

@Injectable()
export class RowService {
  constructor(
    @InjectModel(Row.name) private readonly rowModel: Model<RowDocument>,
    @InjectModel(Area.name) private readonly areaModel: Model<AreaDocument>,
    @Inject(AreaService) private readonly areaService: AreaService,
  ) {}

  async findRowById(id: string): Promise<any> {
    try {
      const res = await this.rowModel.findById(id);
      if (!res) {
        throw new Error('Row not found');
      }
      return res;
    } catch (error) {
      return await handleGetById(error);
    }
  }

  async findAllRows() {
    return await this.rowModel.find();
  }

  async findRow({ id, number, area, areaNumber }) {
    try {
      const res = id
        ? await this.findRowById(id)
        : number
        ? await this.rowModel.find({ number })
        : area || areaNumber
        ? await this.findByArea({ areaId: area, areaNumber })
        : await this.findAllRows();
      if (!res) {
        throw new Error('Row not found');
      }
      return res;
    } catch (error) {
      return await handleGetById(error);
    }
  }

  async findByArea({ areaId, areaNumber }) {
    const area = await this.areaService.findArea(
      Object.assign({
        id: areaId,
        number: areaNumber,
      }),
    );
    if (area.ERROR) {
      return area;
    }
    return await this.rowModel.find({ area }).exec();
  }

  async createRow(createRowDto: CreateRowDto) {
    const area = await this.areaService.findAreaById(createRowDto.area);
    if (!area) {
      throw new Error('Area not found');
    }
    const rowNumber = generateNumber(area, area.sumRows + 1);
    const createdRow = new this.rowModel({
      area,
      number: rowNumber,
      description: createRowDto.description,
      sumSeats: 0,
    });
    try {
      const res = await createdRow.save();
      area.sumRows++;
      area.save();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}
