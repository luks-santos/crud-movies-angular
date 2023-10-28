import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';

import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly API = 'api/movies';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.API);
  }

  findById(id: Number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.API}/${id}`);
  }

  save(record: Partial<Movie>): Observable<Movie> {
    return this.httpClient.post<Movie>(this.API, record);
  }


} 
