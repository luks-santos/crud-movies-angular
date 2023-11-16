import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  
  @Input() movies: Movie[] = [];
  @Output() add = new EventEmitter<Movie>();
  @Output() edit = new EventEmitter<Movie>();
  @Output() delete = new EventEmitter<Movie>();

  readonly displayedColumns = ['name', 'releaseDate', 'duration', 'classification', 'actions'];

  constructor() {}

  onAdd() {
    this.add.emit();
  }

  onEdit(movie: Movie) {    
    this.edit.emit(movie);
  }

  onDelete(movie: Movie) {
    this.delete.emit(movie);
  }
}
