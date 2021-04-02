import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _AngularFirestore:AngularFirestore, private _DbService:DbService) { }

  getChat() {
    return this._AngularFirestore.collection("chat", ref => ref.orderBy("date", "asc")).snapshotChanges();
  }

  addMessage(message:string) {
    return this._AngularFirestore.collection("chat").add({
      message,
      username: this._DbService.username,
      uId: this._DbService.uId,
      date: new Date()
    })
  }

}
