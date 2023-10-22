import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [
    {_id: 1, name: 'Film1', category: 'Cat1'}
  ];
  displayedColumns = ['name', 'category']

  constructor() {
  }

  ngOnInit() {
  }
}
