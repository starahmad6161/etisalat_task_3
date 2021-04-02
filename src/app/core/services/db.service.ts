import { User } from '../../shared/interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  poster_path:string = "https://image.tmdb.org/t/p/w500";
  username:string = "";
  uId:string = "";
  constructor(private _AngularFirestore:AngularFirestore) { }

  addUser(uId:string, userInfo:User) {
    return this._AngularFirestore.collection("users").doc(uId).set(userInfo)
  }

  getUserInfo(uId:string) {
    return this._AngularFirestore.collection("users").doc(uId).snapshotChanges();
  }

  setUserInfoToLocalStorage(userInfo:User) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
  }
  getUserInfoFromLocalStorage() {
    let userInfo = localStorage.getItem("userInfo");
    console.log(userInfo, !!userInfo);
    return userInfo ? JSON.parse(userInfo): "";
  }
}
