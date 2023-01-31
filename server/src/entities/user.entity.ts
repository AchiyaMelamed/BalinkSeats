export class EmployeeEntity {
  constructor(
    public id: string,
    public employee: EmployeeEntity,
    public password: string,
  ) {}
}
