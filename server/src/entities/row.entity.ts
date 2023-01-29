import { AreaEntity } from './area.entity';

export class RowEntity {
  constructor(
    public id: string,
    public area: AreaEntity,
    public number: string,
    public description: string,
    public sumSeats: number,
  ) {}
}
