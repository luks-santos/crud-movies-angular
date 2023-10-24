import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('salvar');
    
  }

  onCancel() {
    console.log('cancelar');
    
  }
}
