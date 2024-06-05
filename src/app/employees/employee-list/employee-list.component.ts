import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  employees: String[] = ['James Deen', 'Johnny Depp', 'Mark Cain'];
  onSelectEmployee() {}
}
