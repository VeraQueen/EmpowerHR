import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Employee } from './employees/new-employee/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  sendEmployeeInfoData = new ReplaySubject<Employee>();
}
