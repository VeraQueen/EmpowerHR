import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
  onAddNewEmployee() {
    this.router.navigate(['newEmployee'], { relativeTo: this.route });
  }
}
