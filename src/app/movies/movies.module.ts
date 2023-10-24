import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { MoviesFormComponent } from './movies-form/movies-form.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies/movies.component';

@NgModule({
  declarations: [
    MoviesComponent,
    MoviesFormComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MoviesModule { }
