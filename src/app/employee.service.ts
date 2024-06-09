// core angular imports
import { Injectable } from '@angular/core';

// third-party imports
import { ReplaySubject } from 'rxjs';

// other application-specific imports
import { Employee } from './employees/new-employee/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // employee data subject
  sendEmployeeInfoData = new ReplaySubject<Employee>();
}
