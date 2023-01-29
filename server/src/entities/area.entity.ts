import { OfficeEntity } from './office.entity';

export class AreaEntity {
  constructor(
    public id: string,
    public office: OfficeEntity,
    public number: string,
    public description: string,
    public sumRows: number,
  ) {}
}
