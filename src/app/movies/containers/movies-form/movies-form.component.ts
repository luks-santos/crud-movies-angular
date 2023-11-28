import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Comment } from '../../model/comment';
import { Movie } from '../../model/movie';
import { MoviesService } from '../../service/movies.service';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {

  ready: boolean = false;
  form!: FormGroup;
  
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private serviceMovie: MoviesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
    ) { 
  }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } 
      else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsTouched({ onlySelf: true });
        //recursão até encontrar um control
        this.validateAllFormFields(control);
      }
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadMovie(id);
      } else {
        this.initializeEmptyForm();
      }
    });
  }
  
  loadMovie(id: string): void {
    this.serviceMovie.loadById(id).subscribe(movie => {
      this.form = this.formBuilder.group({
        _id: movie._id,
        name: movie.name,
        releaseDate: movie.releaseDate,
        duration: movie.duration,
        classification: movie.classification,
        comments: this.formBuilder.array(this.retrieveLessons(movie))
      });     
      this.ready = true;
    });
  }
  
  initializeEmptyForm(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      releaseDate: new FormControl(1988, [Validators.required, Validators.min(1888), Validators.max(9999)]),
      duration: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(7)]),
      classification: new FormControl('', [Validators.required]),
      comments: this.formBuilder.array([], [Validators.required])
    });
    this.ready = true;
  }

  private retrieveLessons(movie?: Movie) {
    const comments = [];

    if (movie?.comments) {
      movie.comments.forEach(comment => comments.push(this.createComment(comment)));
    } else {
      comments.push(this.createComment());
    }
    return comments;
  }

  private createComment(comment: Comment = {id: '', review: ''}) {
    return this.formBuilder.group({
      id: [comment.id],
      review: [comment.review, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });
  }

  getCommentsFormArray() {
    return (<UntypedFormArray>this.form.get('comments')).controls;
  }

  addNewComment() {
    const comments = this.form.get('comments') as UntypedFormArray;
    comments.push(this.createComment());
  }
  
  removeComment(index: number) {
    const comments = this.form.get('comments') as UntypedFormArray;
    comments.removeAt(index);
  }

  onSubmit() {    
    if (this.form.valid) {
      const formData = this.form.value as Partial<Movie>;
      this.serviceMovie.save(formData).subscribe(
      {
        next: () => this.onSuccess(),
        error: () => this.onError(),
        complete: () => this.onCancel()
      });
    } else {
      this.validateAllFormFields(this.form);
    }
   
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
}
