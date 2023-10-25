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
      //crio um group para categoria
      category: this.formBuilder.group({
        acao: false,
        fantasia: false,
        terror: false
      })
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.value);
    
    this.serviceMovie.save(this.form.value).subscribe(request => {
      console.log(request);
      
    })
  }

  onCancel() {
    console.log('cancelar');
    
  }
}
