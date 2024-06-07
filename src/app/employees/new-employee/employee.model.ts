export class Employee {
  constructor(
    public firstName: string,
    public lastName: string,
    public gender: string,
    public birthYear: string,
    public department: string,
    public contractType: string,
    public startDate: string,
    public contractValidity?: string,
    public profilePhoto?: string,
    public numVacationDays?: string,
    public numDaysOff?: string,
    public numPaidLeaveDays?: string
  ) {}
}
