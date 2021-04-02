import { MoviesService } from '../services/movies.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: "root"})

export class MovieResolver implements Resolve<any[]>{

  constructor(private _MoviesService:MoviesService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
    const movieId = route.paramMap.get("id");
      return movieId ? this._MoviesService.getMovieById(movieId).pipe(catchError(() => of(null))):EMPTY;
  };
}
