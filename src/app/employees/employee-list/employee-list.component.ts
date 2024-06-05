import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  employees: String[] = ['James Deen', 'Johnny Depp', 'Mark Cain'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  onSelectEmployee() {
    this.router.navigate(['employeeInfo'], { relativeTo: this.route });
  }
}
