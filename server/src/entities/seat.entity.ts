export class SeatEntity {
  constructor(
    public id: string,
    public officeNumber: number,
    public areaNumber: number,
    public rowNumber: number,
    public seatNumber: number,
  ) {}
}
