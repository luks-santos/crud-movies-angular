import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MoviesService } from '../service/movies.service';
import { Movie } from '../model/movie';
@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceMovie: MoviesService 
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
    this.serviceMovie.save(this.form.value).subscribe(request => {
      console.log(request);
    }) 
  }

  onCancel() {
    console.log('cancelar');
    
  }
}
