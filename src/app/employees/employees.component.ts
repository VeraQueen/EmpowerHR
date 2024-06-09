// core angular imports
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

// other application-specific imports
import { EmployeeListComponent } from './employee-list/employee-list.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterOutlet, EmployeeListComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // OPENING NEW EMPLOYEE FORM
  onAddNewEmployee() {
    this.router.navigate(['newEmployee'], { relativeTo: this.route });
  }
}
