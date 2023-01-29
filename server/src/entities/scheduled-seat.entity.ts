import { EmployeeEntity } from './employee.entity';
import { SeatEntity } from './seat.entity';

export class ScheduledSeatEntity {
  id: string;
  seat: SeatEntity;
  employee: EmployeeEntity;
  startDate: Date;
  endDate: Date;
}
