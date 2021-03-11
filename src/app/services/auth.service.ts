import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import { unsetItems } from '../entry/entry.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuario;

  get user() {
    return { ...this._user };
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {

      if (fuser !== null) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((firestoreUser: any) => {
          const user = Usuario.fromFireBase(firestoreUser);
          this._user = user;
          this.store.dispatch(authActions.setUser({ user }));
        });
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(unsetItems());
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, name, user.email);
        return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
      });
  }

  logInUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fUser => fUser != null)
    );
  }
}
