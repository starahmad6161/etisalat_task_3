import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _AngularFireAuth:AngularFireAuth) { }

  signup(email:string, password:string) {
    return this._AngularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email:string, password:string) {
    return this._AngularFireAuth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    return this._AngularFireAuth.authState;
  }
  logout() {
    return this._AngularFireAuth.signOut();
  }
}
