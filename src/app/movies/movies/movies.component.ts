import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from '../model/movie';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;
  displayedColumns = ['name', 'category']

  constructor(private moviesService: MoviesService) {
    this.movies$ = this.moviesService.findAll();
  }

  ngOnInit() {
  }
}
