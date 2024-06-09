// core angular imports
import { Injectable } from '@angular/core';

// firebase storage imports
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  // UPLOADING AN EMPLOYEE PROFILE PHOTO
  uploadProfilePicture(profilePicFile: File, employeeUsername: string) {
    // defining a storage path
    const profileImageRef = ref(
      this.storage,
      `profilePictures/${employeeUsername}`
    );

    // uploading to storage
    return uploadBytes(profileImageRef, profilePicFile);
  }

  // DOWNLOADING AN EMPLOYEE PROFILE PHOTO
  loadProfilePicture(employeeUsername: string) {
    // defining an image path
    const profileImageRef = ref(
      this.storage,
      `profilePictures/${employeeUsername}`
    );
    // returning image and subscribing in employee-info
    return getDownloadURL(profileImageRef);
  }
}
