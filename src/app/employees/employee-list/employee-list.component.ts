import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../firestore.service';
import { Employee } from '../new-employee/employee.model';
import { EmployeeService } from '../../employee.service';

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
    private firestoreService: FirestoreService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.firestoreService.getEmployees().subscribe((employees: any) => {
      this.employees = employees;
    });
  }

  onSelectEmployee(i: number) {
    const employeeSelected = this.employees[i];
    this.employeeService.sendEmployeeInfoData.next(employeeSelected);
    this.router.navigate(['employeeInfo'], { relativeTo: this.route });
  }

  onGetEmployees() {}
}
