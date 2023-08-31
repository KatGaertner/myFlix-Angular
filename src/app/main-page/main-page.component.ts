import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * This is the main page of the app that includes lists of movies.
 */
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  movies: any[] = [];
  featured: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

  /**
   * On initiation, generates the lists of movies with {@link getMovies}.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Generates a list of all movies and a list of featured movies.
   * If `localStorage` has a variable `'movies'`, that is used.
   * Otherwise, it calls an API service function that gets all movies
   * ({@link FetchApiDataService.getAllMovies}) and saves that list in `localStorage`.
   * It then filters out the movies that have the parameter `featured: true` and saves
   * those in the `featured` variable.
   */
  getMovies(): void {
    const data = localStorage.getItem('movies');
    if (data) {
      this.movies = JSON.parse(data);
      this.featured = this.movies.filter((movie) => movie.featured === true);
    } else {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        localStorage.setItem('movies', JSON.stringify(resp));
        this.featured = this.movies.filter((movie) => movie.featured === true);
      });
    }
  }

  /**
   * Clears `localStorage`. (The redirection to the base path/welcome page is declared in the html template.)
   */
  logout(): void {
    localStorage.clear();
  }
}
