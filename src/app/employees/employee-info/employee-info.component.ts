import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.css',
})
export class EmployeeInfoComponent {
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
}
