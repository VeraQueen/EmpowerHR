import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  collectionData,
  deleteDoc,
  arrayUnion,
  updateDoc,
  getDoc,
  arrayRemove,
  getDocs,
  writeBatch,
} from '@angular/fire/firestore';

// Application-specific imports
import { Employee } from './employees/new-employee/employee.model';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  // SAVING EMPLOYEE DATA
  saveEmployee(employeeForm: Employee, employeeUsername: string) {
    // defining firestore document path
    const docRef = doc(this.firestore, 'employees', employeeUsername);

    // defining constants for each field
    const firstName = employeeForm.firstName;
    const lastName = employeeForm.lastName;
    const gender = employeeForm.gender;
    const birthYear = employeeForm.birthYear;
    const department = employeeForm.department;
    const contractType = employeeForm.contractType;
    const startDate = employeeForm.startDate;
    const contractValidity = employeeForm.contractValidity;
    const numVacationDays = employeeForm.numVacationDays;
    const numDaysOff = employeeForm.numDaysOff;
    const numPaidLeaveDays = employeeForm.numPaidLeaveDays;

    // defining firestore document data object
    const employeeData: Employee = {
      firstName,
      lastName,
      gender,
      birthYear,
      department,
      contractType,
      startDate,
    };

    // checking for optional values
    if (contractType !== undefined) employeeData.contractType = contractType;
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

  getEmployees() {
    const colRef = collection(this.firestore, 'employees');
    return collectionData(colRef);
  }

  // getPlaylists(user: User) {
  //   const colRef = collection(this.firestore, user.id);
  //   return collectionData(colRef);
  // }

  // getWatchedVideoIds(playlistId: string, user: User) {
  //   const docRef = doc(this.firestore, user.id, playlistId);
  //   return getDoc(docRef);
  // }

  // async deletePlaylist(playlistId: string, user: User) {
  //   const playlistRef = doc(this.firestore, user.id, playlistId);
  //   const subcollections: string[] = [];
  //   const snapshot = await getDoc(playlistRef);

  //   if (snapshot.exists()) {
  //     const data = snapshot.data();
  //     if (data && data.subcollections) {
  //       subcollections.push(...data.subcollections);
  //     }
  //   }

  //   for (const subcollection of subcollections) {
  //     const subColRef = collection(
  //       this.firestore,
  //       `${user.id}/${playlistId}/${subcollection}/`
  //     );
  //     const subColSnapshot = await getDocs(subColRef);

  //     const batch = writeBatch(this.firestore);
  //     subColSnapshot.forEach((docSnapshot) => {
  //       batch.delete(docSnapshot.ref);
  //     });
  //     await batch.commit();
  //   }

  //   await deleteDoc(playlistRef);
  // }

  // addVideoNotesCol(playlistId: string, videoId: string, user: User) {
  //   const videoNotesCollections = doc(
  //     this.firestore,
  //     `${user.id}/${playlistId}/${videoId}/`,
  //     'nullNote'
  //   );
  //   setDoc(videoNotesCollections, { null: null });

  //   const docRef = doc(this.firestore, user.id, playlistId);
  //   updateDoc(docRef, {
  //     subcollections: arrayUnion(videoId),
  //   });
  // }

  // addWatchedVideoIds(playlistId: string, videoId: string, user: User) {
  //   const docRef = doc(this.firestore, user.id, playlistId);
  //   updateDoc(docRef, { watchedVideoIds: arrayUnion(videoId) });
  // }

  // removeFromWatched(videoId: string, playlistId: string, user: User) {
  //   const docRef = doc(this.firestore, user.id, playlistId);
  //   updateDoc(docRef, { watchedVideoIds: arrayRemove(videoId) });
  // }

  // saveNote(playlistId: string, videoId: string, note: Note, user: User) {
  //   const colRef = doc(
  //     this.firestore,
  //     `${user.id}/${playlistId}/${videoId}`,
  //     `${note.note}`
  //   );
  //   setDoc(colRef, {
  //     note: note.note,
  //     timestamp: note.timestamp,
  //     timestampSeconds: note.timestampSeconds,
  //   });
  // }

  // getVideoNotes(playlistId: string, videoId: string, user: User) {
  //   const colRef = collection(
  //     this.firestore,
  //     `${user.id}/${playlistId}/${videoId}`
  //   );
  //   return collectionData(colRef);
  // }

  // deleteNote(playlistId: string, videoId: string, note: Note, user: User) {
  //   const docRef = doc(
  //     this.firestore,
  //     `${user.id}/${playlistId}/${videoId}/${note.note}`
  //   );
  //   deleteDoc(docRef);
  // }
}
