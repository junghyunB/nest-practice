import { Injectable } from '@nestjs/common';
import { Movie } from './entity/Movie';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { ExceptionHandler } from '../utils/expectionHandler';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {

    ExceptionHandler.badRequestId(id);

    const movie = this.movies.find(movie => movie.id === id);
    ExceptionHandler.notFoundData(movie);
    return movie;
  }

  getOneIndex(id: number): number {

    ExceptionHandler.badRequestId(id);

    const movieIndex = this.movies.findIndex(movie => movie.id === id);
    ExceptionHandler.notFoundIndex(movieIndex);

    return movieIndex;
  }

  deleteOne(id: number): void {

    ExceptionHandler.badRequestId(id);

    this.getOne(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  create(movieData: CreateMovieDto): void {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData
    })

  }

  update(id: number, updateData: UpdateMovieDto): void {

    ExceptionHandler.badRequestIdOrBody(id, updateData);

    const movieIndex = this.getOneIndex(id);
    this.movies[movieIndex] = {
      ...this.movies[movieIndex],
      ...updateData
    };
  }
}
