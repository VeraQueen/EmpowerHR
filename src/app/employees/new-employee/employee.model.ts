export class Employee {
  constructor(
    public username: string,
    public firstName: string,
    public lastName: string,
    public gender: string,
    public birthYear: string,
    public department: string,
    public contractType: string,
    public startDate: string,
    public profilePhotoUrl: string,
    public contractValidity?: string,
    public numVacationDays?: string,
    public numDaysOff?: string,
    public numPaidLeaveDays?: string
  ) {}
}
