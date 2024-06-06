import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  getGenders() {
    return ['male', 'female', 'other'];
  }

  getBirthYears(): number[] {
    const currentYear = new Date().getFullYear();
    const birthYears = [];
    for (let year = currentYear; year >= 1950; year--) {
      birthYears.push(year);
    }
    return birthYears;
  }

  getValidityMonths(): number[] {
    const validityMonths = [];
    for (let i = 1; i <= 12; i++) {
      validityMonths.push(i);
    }
    return validityMonths;
  }

  getDepartments(): string[] {
    return [
      'Human Resources',
      'Sales and Marketing',
      'Cybersecurity',
      'Project Management',
      'IT Support and Operations',
      'Software Development',
    ];
  }

  getContractTypes(): string[] {
    return ['Permanent', 'Fixed-term', 'Temporary'];
  }
}
