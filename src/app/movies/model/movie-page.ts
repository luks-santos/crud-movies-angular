import { Movie } from './movie';

export interface MoviePage {
  content: Movie[];
  totalElements: number;
  totalPage: number;
}