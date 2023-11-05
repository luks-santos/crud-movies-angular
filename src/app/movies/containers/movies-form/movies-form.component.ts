import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../../model/movie';
import { MoviesService } from '../../service/movies.service';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    releaseDate: new FormControl(1888, [Validators.required, Validators.min(1888), Validators.max(9999)]),
    movieDuration: new FormControl('', [Validators.required,  Validators.minLength(5), Validators.maxLength(7)]),
    movieClassification: new FormControl('', [Validators.required])
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
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
    const formData = this.form.value as Partial<Movie>;
    this.serviceMovie.save(formData).subscribe(
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
    this.snackBar.open("Filme Salvo com Sucesso", '', { duration: 4000 });
  }

  private onError() {
    this.snackBar.open("Error ao Salvar Filme", '', { duration: 6000 });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if(field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if(field?.hasError('min')) {
      return 'O ano mínimo permitido é 1888. Por favor, insira um ano igual ou posterior a 1888.'
    }

    if(field?.hasError('max')) {
      return 'O ano máximo permitido é 9999. Por favor, insira um ano igual ou inferior a 9999.'
    }

    if(field?.hasError('minlength')) {
      const requiredLength : number = field.errors ? field.errors['minlength']['requiredLength'] : 7;
      return `O tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if(field?.hasError('maxlength')) {
      const requiredLength : number = field.errors ? field.errors['maxlength']['requiredLength'] : 50;
      return `O tamanho máximo precisa ser de ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

}
