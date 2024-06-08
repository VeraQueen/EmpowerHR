import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../new-employee/employee.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [NgIf],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.css',
})
export class EmployeeInfoComponent implements OnInit {
  employee!: Employee;

  employeeProfilePicUrl!: string;
  firstName!: string;
  lastName!: string;
  gender!: string;
  birthYear!: string;
  department!: string;
  contractType!: string;
  contractValidity!: string | undefined;
  startDate!: string;
  numVacationDays!: string | undefined;
  numDaysOff!: string | undefined;
  numPaidLeaveDays!: string | undefined;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.sendEmployeeInfoData.subscribe((employee) => {
      console.log(employee);
      this.employee = employee;

      const {
        firstName,
        lastName,
        gender,
        birthYear,
        department,
        contractType,
        contractValidity,
        startDate,
        numVacationDays,
        numDaysOff,
        numPaidLeaveDays,
      } = employee;

      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.birthYear = birthYear;
      this.department = department;
      this.contractType = contractType;
      this.contractValidity = contractValidity;
      this.startDate = startDate;
      this.numVacationDays = numVacationDays;
      this.numDaysOff = numDaysOff;
      this.numPaidLeaveDays = numPaidLeaveDays;
    });
  }
}
