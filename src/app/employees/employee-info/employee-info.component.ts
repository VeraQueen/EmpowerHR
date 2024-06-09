// core angular imports
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

// other application-specific imports
import { EmployeeService } from '../../employee.service';
import { Employee } from '../new-employee/employee.model';

@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [NgIf],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.css',
})
export class EmployeeInfoComponent implements OnInit {
  employee!: Employee;

  profilePhotoUrl!: string;
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

  // INITIALIZING EMPLOYEE INFORMATION PAGE
  ngOnInit() {
    // subscribing to subject for an employee
    this.employeeService.sendEmployeeInfoData.subscribe((employee) => {
      this.employee = employee;

      // destucturing employee object
      const {
        firstName,
        lastName,
        gender,
        birthYear,
        department,
        contractType,
        contractValidity,
        startDate,
        profilePhotoUrl,
        numVacationDays,
        numDaysOff,
        numPaidLeaveDays,
      } = employee;

      // setting values needed for tables
      this.profilePhotoUrl = profilePhotoUrl;
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
