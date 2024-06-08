import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from './employees/new-employee/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  sendEmployeeInfoData = new Subject<Employee>();
}
