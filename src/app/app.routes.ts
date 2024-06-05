// Angular core libraries
import { Routes } from '@angular/router';

// Application components
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeInfoComponent } from './employees/employee-info/employee-info.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { EmployeeStartComponent } from './employees/employee-start/employee-start.component';
import { EmployeesComponent } from './employees/employees.component';

// exporting routes configuration
export const routes: Routes = [
  // ROUTE TO:
  // { path: '', redirectTo: '/employeeList', pathMatch: 'full' },
  {
    path: '',
    component: EmployeesComponent,
    pathMatch: 'full',
    children: [
      { path: '', component: EmployeeStartComponent },
      {
        path: 'employeeInfo',
        component: EmployeeInfoComponent,
      },
      {
        path: 'newEmployee',
        component: NewEmployeeComponent,
      },
    ],
  },
  // wild card option - goes to the list of employees
  // {
  //   path: '**',
  //   redirectTo: '/employeeList',
  // },
];
