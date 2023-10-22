import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';

import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly API = '/assets/movies.json';

  constructor(private httpClient: HttpClient) { }


  findAll(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.API)
    .pipe(
      first(),
      delay(5000),
      tap(movies => console.log(movies))
    );
  }
} 
