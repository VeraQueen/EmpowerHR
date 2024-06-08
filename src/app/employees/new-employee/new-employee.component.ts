// core angular imports
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// other application imports
import { FormService } from './form.service';
import { RequiredMessageComponent } from '../../shared/required-message/required-message.component';

// third-party imports
import { Subscription } from 'rxjs';
import { FirestoreService } from '../../firestore.service';
import { Employee } from './employee.model';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    NgFor,
    RequiredMessageComponent,
  ],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css',
})
export class NewEmployeeComponent implements OnInit, OnDestroy {
  newEmployeeForm!: FormGroup;
  @ViewChild('saveButton') saveButton!: ElementRef<HTMLButtonElement>;
  contractTypeSubscription!: Subscription | undefined;
  formStatusChangeSubscription!: Subscription | undefined;
  genders: string[] = [];
  birthYears: number[] = [];
  contractTypes: string[] = [];
  validityMonths: number[] = [];
  departments: string[] = [];

  constructor(
    private formService: FormService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.newEmployeeForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl('', Validators.required),
      birthYear: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      contractType: new FormControl('', Validators.required),
      contractValidity: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      startDate: new FormControl(null, Validators.required),
      // numVacationDays: new FormControl(null, Validators.required),
      // numDaysOff: new FormControl(null, Validators.required),
      // numPaidLeaveDays: new FormControl(null, Validators.required),
    });

    // getting form select data
    this.birthYears = this.formService.getBirthYears();
    this.validityMonths = this.formService.getValidityMonths();
    this.departments = this.formService.getDepartments();
    this.contractTypes = this.formService.getContractTypes();
    this.genders = this.formService.getGenders();

    // set up subscriptions
    this.onContractTypeChange();
    this.onFormStatusChange();
  }

  // dealing with changes in contract type control to enable/disable contract validity control
  private onContractTypeChange(): void {
    const contractTypeControl = this.newEmployeeForm.get('contractType');
    const contractValidityControl =
      this.newEmployeeForm.get('contractValidity');

    this.contractTypeSubscription = contractTypeControl?.valueChanges.subscribe(
      (value) => {
        if (value !== 'Permanent') {
          contractValidityControl!.enable();
        } else {
          contractValidityControl!.disable();
        }
      }
    );
  }

  // dealing with status changes of the form to allow button enabling
  private onFormStatusChange(): void {
    this.formStatusChangeSubscription =
      this.newEmployeeForm.statusChanges.subscribe((value) => {
        if (value === 'VALID') {
          this.saveButton.nativeElement.disabled = false;
        } else {
          this.saveButton.nativeElement.disabled = true;
        }
      });
  }

  // submitting the form values
  onSubmit() {
    const employeeForm: Employee = this.newEmployeeForm.value;
    this.firestoreService.saveEmployee(employeeForm);
    this.newEmployeeForm.reset();
  }

  // clean up subscriptions
  ngOnDestroy() {
    if (this.contractTypeSubscription) {
      this.contractTypeSubscription.unsubscribe();
    }
    if (this.formStatusChangeSubscription) {
      this.formStatusChangeSubscription.unsubscribe();
    }
  }
}
