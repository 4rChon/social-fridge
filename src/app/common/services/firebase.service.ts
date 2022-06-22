import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { FirebaseApp, initializeApp } from '@firebase/app';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private _app: FirebaseApp;

  get app(): FirebaseApp {
    return this._app;
  }

  constructor() {
    this._app = initializeApp(environment.firebaseConfig);
  }
}