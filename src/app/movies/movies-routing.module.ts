import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesFormComponent } from './movies-form/movies-form.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'new', component: MoviesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
