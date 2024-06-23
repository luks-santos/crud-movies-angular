import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Movie } from '../../model/movie';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.scss'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatMiniFabButton, MatIcon, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
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
