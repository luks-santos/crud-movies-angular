import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  
  @Input() movies: Movie[] = [];
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();

  readonly displayedColumns = ['name', 'releaseDate', 'movieDuration', 'movieClassification', 'actions'];

  constructor() {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(movie: Movie) {    
    this.edit.emit(movie);
  }
}
