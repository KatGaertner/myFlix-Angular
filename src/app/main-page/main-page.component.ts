import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  movies: any[] = [];
  featured: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    const data = localStorage.getItem('movies');
    if (data) this.movies = JSON.parse(data);
    else {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        localStorage.setItem('movies', JSON.stringify(resp));
      });
    }
    this.featured = this.movies.filter((movie) => movie.featured === true);
  }

  toProfile(): void {
    this.router.navigate(['profile']);
  }
}
