import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  genre_ids:any = environment.genre_id;
  transform(genreID: any): any {
    return this.genre_ids[genreID]
  }

}
