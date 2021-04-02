import { DbService } from './../../core/services/db.service';
import { MoviesService } from './../../core/services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/app/shared/interfaces/movie-details';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movieDetails:MovieDetails = {};
  comment:string = "";
  commentsList:any[] = [];
  loading:boolean = true;
  constructor(private _activatedRoute:ActivatedRoute, private _Router:Router, private _MoviesService:MoviesService, private _DbService:DbService) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(data => {
      if (!data.movieDetails) {
        this._Router.navigate(["/not-found"]);
      } else {
        this.movieDetails = data.movieDetails;
        this.loadComments();
        this.loading = false;
      }
    });
  }

  loadComments() {
    let commentsList = this._MoviesService.getDataFromLocal("comments");
    this.commentsList = commentsList.length > 0 ? commentsList.filter((item:any) => item.movie_id == this.movieDetails.id)[0]?.comments || [] : [];
  }

  /*For Main Comment */
  addComment() {
    if (this.comment.trim() !== "") {
      let currentUser = this._DbService.username;
      let comment = {
        id: Math.round(Math.random() * 1000000),
        date: new Date(),
        username: currentUser,
        body: this.comment,
        show_reply: false,
        replies: []
      }
      this._MoviesService.addComment(this.movieDetails.id, comment);
      this.loadComments();
      this.comment = "";
    }
  }

  /**
   * For Reply
   * @param event => get event that pushed from child <app-reply>
   */
  reply(event:any) {
    let currentUser = this._DbService.username;
    let comment = {
      username: currentUser,
      body: event.body,
      replyTo: event.replyTo,
      date: new Date()
    }
    this._MoviesService.addReply(this.movieDetails.id, event.commentId, comment);
    this.loadComments();
  }


  trackBy(index:any, comment:any) {
    return comment.id;
  }

}
