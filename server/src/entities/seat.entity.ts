import { EmployeeEntity } from './employee.entity';
import { RowEntity } from './row.entity';

export class SeatEntity {
  constructor(
    public id: string,
    public row: RowEntity,
    public number: string,
    public description: string,
    public sitting: EmployeeEntity | null,
  ) {}
}
