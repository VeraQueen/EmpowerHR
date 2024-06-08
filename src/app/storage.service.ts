import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  // uploading an employee profile photo
  uploadProfilePicture(profilePicFile: File, employeeUsername: string) {
    // defining a storage path
    const profileImageRef = ref(this.storage, employeeUsername);

    // uploading to storage
    uploadBytes(profileImageRef, profilePicFile);
  }
}
