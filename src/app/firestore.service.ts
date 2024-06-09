// core angular imports
import { Injectable } from '@angular/core';

// firebase firestore imports
import {
  Firestore,
  collection,
  doc,
  setDoc,
  collectionData,
} from '@angular/fire/firestore';

// Application-specific imports
import { Employee } from './employees/new-employee/employee.model';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  // SAVING EMPLOYEE DATA
  saveEmployee(
    employeeForm: Employee,
    employeeUsername: string,
    profilePhotoPath: string
  ) {
    // defining firestore document path
    const docRef = doc(this.firestore, 'employees', employeeUsername);

    // defining constants for each field
    const username = employeeUsername;
    const firstName = employeeForm.firstName;
    const lastName = employeeForm.lastName;
    const gender = employeeForm.gender;
    const birthYear = employeeForm.birthYear;
    const department = employeeForm.department;
    const contractType = employeeForm.contractType;
    const startDate = employeeForm.startDate;
    const profilePhotoUrl = profilePhotoPath;
    const contractValidity = employeeForm.contractValidity;
    const numVacationDays = employeeForm.numVacationDays;
    const numDaysOff = employeeForm.numDaysOff;
    const numPaidLeaveDays = employeeForm.numPaidLeaveDays;

    // defining firestore document data object
    const employeeData: Employee = {
      username,
      firstName,
      lastName,
      gender,
      birthYear,
      department,
      contractType,
      startDate,
      profilePhotoUrl,
    };

    // checking for optional values
    if (contractValidity !== undefined)
      employeeData.contractValidity = contractValidity;
    if (numVacationDays !== undefined)
      employeeData.numVacationDays = numVacationDays;
    if (numDaysOff !== undefined) employeeData.numDaysOff = numDaysOff;
    if (numPaidLeaveDays !== undefined)
      employeeData.numPaidLeaveDays = numPaidLeaveDays;

    // saving to firestore
    setDoc(docRef, employeeData);
  }

  // GETTING EMPLOYEE DATA
  getEmployees() {
    // defining firestore collection path
    const colRef = collection(this.firestore, 'employees');

    // returning data from firestore, subscribe in the list component
    return collectionData(colRef);
  }
}
