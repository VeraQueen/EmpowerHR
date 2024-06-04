// Angular core libraries
import { Routes } from '@angular/router';

// Application components
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';

// exporting routes configuration
export const routes: Routes = [
  // ROUTE TO:
  // if empty
  {
    path: '',
    redirectTo: '/employeeList',
    pathMatch: 'full',
  },
  // if specified path
  {
    path: 'employeeList',
    component: EmployeeListComponent,
  },
  // if specified path
  {
    path: 'employeeInfo',
    component: EmployeeInfoComponent,
  },
  // if specified path
  {
    path: 'newEmployee',
    component: NewEmployeeComponent,
  },
  // wild card option - goes to the list of employees
  {
    path: '**',
    redirectTo: '/employeeList',
  },
];
