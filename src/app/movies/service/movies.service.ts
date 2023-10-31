import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  loadById(id: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.API}/${id}`);
  }

  save(record: Partial<Movie>): Observable<Movie> {
    console.log(record);
    
    if(record._id === "") {
      console.log('crete');
      
      return this.create(record);
    } else {
      console.log('update');
      
      return this.update(record);
    }
  }

  private create(record: Partial<Movie>) {
    return this.httpClient.post<Movie>(this.API, record);
  }

  private update(record: Partial<Movie>) {
    return this.httpClient.put<Movie>(`${this.API}/${record._id}`, record);
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
} 
