import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Movie } from '../../model/movie';
import { MoviesService } from '../../service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

  movies$: Observable<Movie[]>;
  

  constructor(
    private moviesService: MoviesService, 
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.movies$ = this.moviesService.findAll()
    .pipe(
      catchError(() => {
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

  onAdd() {
    // route utiliza a rota atual para acrescentar rota /new
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(movie: Movie) {
    this.moviesService.findById(movie._id).subscribe(m => {
      console.log(m);
    });
    //this.router.navigate([`edit/${movie._id}`], { relativeTo: this.route })
  }
}
