import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '../model/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  
  @Input() movies: Movie[] = [];

  readonly displayedColumns = ['name', 'releaseDate', 'movieDuration', 'movieClassification', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {

  }

  onAdd() {
    // route utiliza a rota atual para acrescentar rota /new
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
