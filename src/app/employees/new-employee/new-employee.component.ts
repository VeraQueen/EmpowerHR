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

// other application-specific imports
import { FormService } from './form.service';
import { RequiredMessageComponent } from '../../shared/required-message/required-message.component';

// third-party imports
import { Subscription } from 'rxjs';
import { FirestoreService } from '../../firestore.service';
import { Employee } from './employee.model';
import { StorageService } from '../../storage.service';

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
  employeeUsername!: string;
  profilePic!: File | undefined;
  genders: string[] = [];
  birthYears: number[] = [];
  contractTypes: string[] = [];
  validityMonths: number[] = [];
  departments: string[] = [];

  constructor(
    private formService: FormService,
    private firestoreService: FirestoreService,
    private storageService: StorageService
  ) {}

  // USING NGONINIT TO INITIALIZE THE FORM, FORM DATA AND SUBSCRIPTIONS
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
      numVacationDays: new FormControl(null),
      numDaysOff: new FormControl(null),
      numPaidLeaveDays: new FormControl(null),
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

  // DEALING WITH CHANGES IN CONTRACT TYPE CONTROL TO ENABLE/DISABLE CONTRACT VALIDITY CONTROL
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

  // DEALING WITH STATUS CHANGES OF THE FORM TO ALLOW BUTTON ENABLING
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

  // SUBMITTING THE FORM VALUES AND A PROFILE PICTURE
  async onSubmit() {
    // defining form value constant
    const employeeForm: Employee = this.newEmployeeForm.value;

    // defining firestore document ID
    const employeeUsername =
      employeeForm.firstName[0].toLowerCase() +
      employeeForm.lastName.toLowerCase() +
      employeeForm.birthYear;
    this.employeeUsername = employeeUsername;

    // Using a boolean to track uploading success
    let uploadingSuccess = false;
    let photoUrl: string = '';

    // using a service to upload an image to firebase storage
    if (this.profilePic !== undefined) {
      await this.storageService.uploadProfilePicture(
        this.profilePic,
        this.employeeUsername
      );
      uploadingSuccess = true;
    } else {
      uploadingSuccess = false;
    }

    // using a service to get the image link if uploadingSuccess true
    if (uploadingSuccess) {
      photoUrl = await this.storageService.loadProfilePicture(
        this.employeeUsername
      );
    } else {
      photoUrl = '';
    }

    // using a service to save data to firestore
    this.firestoreService.saveEmployee(
      employeeForm,
      employeeUsername,
      photoUrl
    );

    // resetting values
    this.newEmployeeForm.reset();
    this.profilePic = undefined;
  }

  // ON SELECTED IMAGE FILE
  onImageSelected(e: any) {
    // defining a file for upload
    this.profilePic = e.target.files[0];
  }

  // CLEAN UP SUBSCRIPTIONS
  ngOnDestroy() {
    if (this.contractTypeSubscription) {
      this.contractTypeSubscription.unsubscribe();
    }
    if (this.formStatusChangeSubscription) {
      this.formStatusChangeSubscription.unsubscribe();
    }
  }
}
