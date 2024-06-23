import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';



import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MoviesFormComponent } from './containers/movies-form/movies-form.component';
import { MoviesComponent } from './containers/movies/movies.component';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
    imports: [
    CommonModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
    MoviesComponent,
    MoviesFormComponent,
    MoviesListComponent,
]
})
export class MoviesModule { }
