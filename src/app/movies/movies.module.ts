import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MoviesFormComponent } from './containers/movies-form/movies-form.component';
import { MoviesComponent } from './containers/movies/movies.component';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  declarations: [
    MoviesComponent,
    MoviesFormComponent,
    MoviesListComponent,
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
