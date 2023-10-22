import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { Movie } from '../model/movie';
import { MoviesService } from '../service/movies.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;
  displayedColumns = ['name', 'category']

  constructor(
    private moviesService: MoviesService, 
    private dialog: MatDialog
  ) {
    this.movies$ = this.moviesService.findAll()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar filmes.')
        
        return of([])
      })
    );
  }

  onError(errorMsg: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit() {
  }
}
