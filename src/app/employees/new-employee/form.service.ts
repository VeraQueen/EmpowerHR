// core angular imports
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  // getting gender form data
  getGenders() {
    return ['male', 'female', 'other'];
  }

  // computing and getting birth year form data
  getBirthYears(): number[] {
    const currentYear = new Date().getFullYear();
    const birthYears = [];
    for (let year = currentYear; year >= 1950; year--) {
      birthYears.push(year);
    }
    return birthYears;
  }

  // computing and getting months form data
  getValidityMonths(): number[] {
    const validityMonths = [];
    for (let i = 1; i <= 12; i++) {
      validityMonths.push(i);
    }
    return validityMonths;
  }

  // getting departments form data
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

  // getting contract types form data
  getContractTypes(): string[] {
    return ['Permanent', 'Fixed-term', 'Temporary'];
  }
}
