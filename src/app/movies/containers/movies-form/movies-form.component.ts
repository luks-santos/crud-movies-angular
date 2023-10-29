import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { delay} from 'rxjs';

import { Movie } from '../../model/movie';
import { MoviesService } from '../../service/movies.service';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: new FormControl('', {nonNullable: true}),
    name: new FormControl('', {nonNullable: true}),
    releaseDate: new FormControl(0, {nonNullable: true}),
    movieDuration: new FormControl('', {nonNullable: true}),
    movieClassification: new FormControl('', {nonNullable: true})
  });

  constructor(
    private formBuilder: FormBuilder,
    private serviceMovie: MoviesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
    ) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      if(id) {
        this.loadMovieData(id);
      }
    });
  }
  
  private loadMovieData(id: string) {
    this.serviceMovie.loadById(id)
    .subscribe(movie => {
      this.populateForm(movie);
    });
  }

  private populateForm(movie: Movie) {
    //this.form.setValue(movie);
    this.form.setValue({
      _id: movie._id,
      name: movie.name,
      releaseDate: movie.releaseDate,
      movieDuration: movie.movieDuration,
      movieClassification: movie.movieClassification
    });
  }

  onSubmit() {    
    this.serviceMovie.save(this.form.value).subscribe(
    {
      next: () => this.onSuccess(),
      error: () => this.onError(),
      complete: () => this.onCancel()
    });
  }

  onCancel() {
    this.location.back()
  }

  private onSuccess() {
    this.snackBar.open("Curso Salvo com Sucesso", '', { duration: 4000 });
  }

  private onError() {
    this.snackBar.open("Error ao Salvar Filme", '', { duration: 6000 });
  }
}
