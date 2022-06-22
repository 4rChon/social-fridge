import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '@common/services/firebase.service';
import { ObservableEvent } from '@common/util/observable-event';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { routePaths } from '@routing/routes';
import {
  Auth,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User
} from 'firebase/auth';
import { BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';
import { collections, FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private provider: GoogleAuthProvider;
  private auth: Auth;
  private _user?: User;
  private authenticationEvent = new ObservableEvent(new ReplaySubject<User | undefined | null>(1));
  private redirectionEvent = new ObservableEvent(new BehaviorSubject(true));
  private disposeAuthStateSubscription: () => void;

  public get user(): User | undefined {
    return this._user;
  }

  public get isLoggedIn(): boolean {
    return this._user !== undefined;
  }

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router) {
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth(this.firebaseService.app);

    this.disposeAuthStateSubscription = onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this._user = user;
        const url = this.router.url;
        const returnUrl = this.router.parseUrl(url).queryParams['returnUrl'];
        this.router.navigateByUrl(returnUrl);
        console.log("user signed in");
      } else {
        this._user = undefined;
        console.log("user signed out");
      }

      this.authenticationEvent.next(user);
    });

    this.signInResult();
  }

  public ngOnDestroy(): void {
    this.disposeAuthStateSubscription();
  }

  public async signIn(): Promise<void> {
    this.redirectionEvent.next(true);
    await signInWithRedirect(this.auth, this.provider);
  }

  public onAuthentication(fn: (u: User | undefined | null) => void): Subscription {
    return this.authenticationEvent.subscribe(fn);
  }

  public onRedirection(fn: (r: boolean) => void): Subscription {
    return this.redirectionEvent.subscribe(fn);
  }

  private async signInResult(): Promise<void> {
    try {
      await getRedirectResult(this.auth)
      // const result = await getRedirectResult(this.auth)
      // if (result) {
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential?.accessToken;
      // }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(`Something went wrong while signing in: ${errorCode}: ${errorMessage}`)
    }

    this.redirectionEvent.next(false);
  }

  public async signOut(): Promise<void> {
    this.redirectionEvent.next(true);

    try {
      await signOut(this.auth);
      this.router.navigateByUrl(routePaths.LOGIN);
    } catch (error) {
      console.error(`Something went wrong while signing out: ${error}`)
    }

    this.redirectionEvent.next(false);
  }
}
