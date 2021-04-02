import { Movie } from '../../shared/interfaces/movie';
import { MoviesService } from './../../core/services/movies.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("filterBy") filterBy!:ElementRef;
  movies:Movie[] = [];
  loading:boolean = false;
  constructor(private _MoviesService:MoviesService) { }
  ngOnInit(): void {
    this.loadMovies()
  }

  loadMovies(value:string = "top_rated", page:string = "1") {
    this.loading = true;
    this._MoviesService.getMovies(value, page).subscribe((data:any) => {
      this.movies = data.results as Movie[];
      this.loading = false;
    },(err) => {
      this.loading = false;
      this.filterBy.nativeElement.value = "top_rated";
    })
  }

  /****************** Favorite Methods ********************/
  addFav(movie:Movie) {
    this._MoviesService.addFav(movie);
  }
  removeFav(movieId:any) {
    this._MoviesService.removeFav(movieId);
  }
  isFav(movieId:any) {
    return this._MoviesService.isFav(movieId);
  }
  /****************** Like Methods ********************/
  addLike(movie:Movie) {
    this._MoviesService.addLike(movie);
  }
  removeLike(movieId:any) {
    this._MoviesService.removeLike(movieId);
  }
  isLiked(movieId:any) {
    return this._MoviesService.isLiked(movieId);
  }


  trackBy(index:any, movie:Movie) {
    return movie.id;
  }
}
