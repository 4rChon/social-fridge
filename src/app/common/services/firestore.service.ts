import { Injectable } from '@angular/core';
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseService } from './firebase.service';

export const collections = {
  USERS: 'users',
  FOOD: 'food',
  UNITS: 'units'
}

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private _db: Firestore;

  public get db(): Firestore {
    return this._db;
  }

  constructor(private readonly firebaseService: FirebaseService) {
    this._db = getFirestore(this.firebaseService.app);
  }
}