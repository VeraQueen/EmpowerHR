import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../firestore.service';
import { Employee } from '../new-employee/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.firestoreService.getEmployees().subscribe((employees: any) => {
      this.employees = employees;
    });
  }

  onSelectEmployee(index: number) {
    this.router.navigate(['employeeInfo'], { relativeTo: this.route });
  }

  onGetEmployees() {}
}
