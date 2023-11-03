import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Movie } from '../../model/movie';
import { MoviesService } from '../../service/movies.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {

  movies$: Observable<Movie[]> | null = null;
  
  constructor(
    private moviesService: MoviesService, 
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  onError(errorMsg: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onConfirm(confirmMsg: String) {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: confirmMsg
    });
  }
  onAdd() {
    // route utiliza a rota atual para acrescentar rota /new
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(movie: Movie) {
    this.moviesService.loadById(movie._id).subscribe(movie => {
      this.router.navigate([`edit/${movie._id}`], { 
        relativeTo: this.route,
      });
    });
  }
  
  private refresh() {
    this.movies$ = this.moviesService.findAll()
    .pipe(
      catchError(() => {
        this.onError('Error ao carregar filmes.')
        return of([])
      })
    );
  }

  onDelete(movie: Movie) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Realmente deseja excluir?",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.moviesService.remove(movie._id).subscribe(
          {
            next: () => {
              this.snackBar.open("Filme deletado com Sucesso", 'X', { 
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            },
            error: () => this.onError("Erro ao tentar remover curso"),
            complete: () => this.refresh()
        });
      }
    });
  }

}
