import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.css',
})
export class EmployeeInfoComponent implements OnInit {
  employee = {
    employeeProfilePicUrl: undefined,
    firstName: 'Alan',
    lastName: 'Brick',
    gender: 'male',
    birthYear: 1975,
    department: 'administration',
    contractType: 'temp',
    contractValidity: '3 mths',
    startDate: new Date(2024, 5, 10),
    numVacationDays: 0,
    numDaysOff: 0,
    numPaidLeaveDays: 0,
  };

  employeeProfilePicUrl = this.employee.employeeProfilePicUrl;
  firstName = this.employee.firstName;
  lastName = this.employee.lastName;
  gender = this.employee.gender;
  birthYear = this.employee.birthYear;
  department = this.employee.department;
  contractType = this.employee.contractType;
  contractValidity = this.employee.contractValidity;
  startDate = this.employee.startDate;
  numVacationDays = this.employee.numVacationDays;
  numDaysOff = this.employee.numDaysOff;
  numPaidLeaveDays = this.employee.numPaidLeaveDays;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.sendEmployeeInfoData.subscribe((data) => {
      console.log(data);
    });
  }
}
