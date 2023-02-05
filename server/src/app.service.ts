import { Inject, Injectable } from '@nestjs/common';
import { OfficeService } from './modules/office/office.service';
import { AreaService } from './modules/area/area.service';
import { RowService } from './modules/row/row.service';
import { SeatService } from './modules/seat/seat.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(OfficeService) private readonly officeService: OfficeService,
    @Inject(AreaService) private readonly areaService: AreaService,
    @Inject(RowService) private readonly rowService: RowService,
    @Inject(SeatService) private readonly seatService: SeatService,
  ) {}

  getHello(): any {
    return {
      Hello: 'welcome to BalinkSeats project',
    };
  }

  async getData(): Promise<any[]> {
    const data = [];

    const offices = await this.officeService.findAllOffices();
    for (const office of offices) {
      const officeNum = data.length;
      data.push({ office, areas: [] });
      const areas = await this.areaService.findByOffice({
        officeId: office._id,
      });
      for (const area of areas) {
        const areaNum = data[officeNum].areas.length;
        data[officeNum].areas.push({ area, rows: [] });
        const rows = await this.rowService.findByArea({
          areaId: area._id,
        });
        for (const row of rows) {
          const rowNum = data[officeNum].areas[areaNum].rows.length;
          data[officeNum].areas[areaNum].rows.push({
            row,
            seats: [],
          });
          const seats = await this.seatService.findByRow({
            rowId: row._id,
          });
          for (const seat of seats) {
            data[officeNum].areas[areaNum].rows[rowNum].seats.push({
              seat,
            });
          }
        }
      }
    }
    return data;
  }

  async deleteAllData(): Promise<any> {
    await this.seatService.deleteAllSeats();
    await this.rowService.deleteAllRows();
    await this.areaService.deleteAllAreas();
    await this.officeService.deleteAllOffices();
    return {
      message: 'All data deleted',
    };
  }
}
