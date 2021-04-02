import { DbService } from './../../core/services/db.service';
import { ChatService } from './../../core/services/chat.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  @ViewChild("messagesEle") messagesEle!:ElementRef;

  messages:any[] = [];
  userMessage:string = "";
  uId:string = "";
  loading:boolean = true;

  constructor(private _ChatService:ChatService, private _DbService:DbService) { }

  ngOnInit(): void {
    this.loadChat();
  }

  scrollToBottom() {
    this.messagesEle.nativeElement.scrollTop = this.messagesEle.nativeElement.scrollHeight
  }
  loadChat() {
    this._ChatService.getChat().subscribe(data => {
      let messages = data.map(item => {
        return {
          id: item.payload.doc.id,
          ...<any>(item.payload.doc.data())
        }
      });
      this.messages = messages;
      this.uId = this._DbService.uId;
      this.loading = false;
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    });
  }

  addMessage() {
    if (this.userMessage.trim() !== "") {
      this.loading = true;
      this._ChatService.addMessage(this.userMessage).then(() => {
        this.userMessage = "";
        this.scrollToBottom();
        this.loading = false;
      });
    }
  }
}
