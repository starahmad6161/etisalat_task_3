import { Movie } from '../../shared/interfaces/movie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movieUrl:string = `${environment.base_url}movie/`;
  constructor(private http:HttpClient) { }



  getMovies(filterBy:string = "top_rated", page = "1") {
    return this.http.get(`${this.movieUrl}${filterBy}`, {
      params: {
        api_key:"1ce59e39ef6128ebb4b3b268edc3027f",
        page
      },
    });
  }

  getMovieById(movieId:string) {
    return this.http.get(`${this.movieUrl}${movieId}`, {
      params: {
        api_key:"1ce59e39ef6128ebb4b3b268edc3027f",
      }
    });
  }


  /****************** Favorite Methods ********************/
  addFav(movie:Movie) {
    let favItems:any[] = this.getDataFromLocal("fav");
    favItems.push(movie);
    this.setDataToLocal("fav", favItems);
  }
  removeFav(movieId:any) {
    let favItems:any[] = this.getDataFromLocal("fav");
    favItems = favItems.filter(movie => movie.id !== movieId);
    this.setDataToLocal("fav", favItems);
  }
  isFav(movieId:any) {
    let favItems:any[] = this.getDataFromLocal("fav");
    return favItems.some(movie => movie.id === movieId);
  }
  /****************** Like Methods ********************/
  addLike(movie:Movie) {
    let likesItems:any[] = this.getDataFromLocal("likes");
    likesItems.push(movie);
    this.setDataToLocal("likes", likesItems);
  }
  removeLike(movieId:any) {
    let likesItems:any[] = this.getDataFromLocal("likes");
    likesItems = likesItems.filter(movie => movie.id !== movieId);
    this.setDataToLocal("likes", likesItems);
  }
  isLiked(movieId:any) {
    let likesItems:any[] = this.getDataFromLocal("likes");
    return likesItems.some(movie => movie.id === movieId);
  }

  /****************** Comments & Reply Methods ********************/
  addComment(movieId:any, comment:any) {
    let commentsList = this.getDataFromLocal("comments");
    if (commentsList.length === 0) {//array is empty
      let commentDetails = {
        movie_id: movieId,
        comments: [comment]
      };
      commentsList.push(commentDetails);

    } else {//array not empty
      //if the movie is in the array => push to movie comments array
      if (this.movieIsExists(movieId)) {
        commentsList = commentsList.map((item:any) => {
          if (item.movie_id == movieId) {
            item.comments.push(comment);
            return item;
          } else {
            return item;
          }
        });
      }
      //if the movie is not in the array create a new commentDetails obj and push it to array
      else {
        let commentDetails = {
          movie_id: movieId,
          comments: [comment]
        };
        commentsList.push(commentDetails);
      }
    }
    //update comments in localStorage
    this.setDataToLocal("comments", commentsList)
  }

  addReply(movieId:any, commentId:any, comment:any) {
    let commentsList:any[] = this.getDataFromLocal("comments");
    let commentDetails = commentsList.filter(item => item.movie_id == movieId)[0]
                  .comments
                  .filter((com:any) => com.id == commentId);
    commentDetails[0].replies.push(comment);
    this.setDataToLocal("comments", commentsList);
  }

  movieIsExists(movieId:any) {
    return this.getDataFromLocal("comments").some((item:any) => item.movie_id == movieId);
  }


  //localStorage Methods
  getDataFromLocal(item:string) {
    let local = window.localStorage.getItem(item);
    return  local ? JSON.parse(local) : [];
  }
  setDataToLocal(item:string, data:any) {
    window.localStorage.setItem(item, JSON.stringify(data));
  }

}
