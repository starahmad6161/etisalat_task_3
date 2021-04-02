import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  @Input() movieId:any;
  @Input() commentId:any;
  @Input() replyTo:any;
  @Input() replyIsOpen:boolean = true;

  @Output() replyEvent:EventEmitter<any> = new EventEmitter<any>();


  replyBody:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  reply() {
    if (this.replyBody.trim() !== "") {
      let comment = {
        movieId: this.movieId,
        commentId: this.commentId,
        body:this.replyBody,
        replyTo:this.replyTo,
      }
      this.replyEvent.emit(comment);
      this.replyBody = "";
      this.replyIsOpen = false;
    }
  }

}
