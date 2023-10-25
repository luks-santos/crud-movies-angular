import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceMovie: MoviesService,
    private snackBar: MatSnackBar,
    private location: Location
    ) { 
    this.form = this.formBuilder.group({
      name: [null],
      releaseDate: [null],
      movieDuration: [null],
      movieClassification: [null]
    });
  }

  ngOnInit() {
  }

  onSubmit() {    
    
    this.serviceMovie.save(this.form.value).subscribe(
    {
      next: () => this.onSuccess(),
      error: () => this.onError(),
      complete: () => {
        this.onCancel()
      }
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
