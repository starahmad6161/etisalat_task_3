import { Movie } from '../../shared/interfaces/movie';
import { MoviesService } from './../../core/services/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  favItems:Movie[] = [];

  constructor(private _MoviesService:MoviesService) { }

  ngOnInit(): void {
    this.loadFavItems();
  }

  loadFavItems() {
    this.favItems = this._MoviesService.getDataFromLocal("fav");
  }

  removeFav(movieId:any) {
    this._MoviesService.removeFav(movieId);
    this.loadFavItems();
  }


  trackBy(index:any, movie:Movie) {
    return movie.id;
  }

}
