import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * This displays info on a movie's genre as a dialog.
 */
@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss'],
})
export class GenrePageComponent implements OnInit {
  /**
   * @param data contains the genre of the movie.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genre: string },
    public fetchApiData: FetchApiDataService
  ) {}
  genre: any;

  /**
   * On initiation, calls an API service function that get the data on the genre
   * ({@link FetchApiDataService.getGenre}).
   */
  ngOnInit(): void {
    if (this.data) {
      this.fetchApiData.getGenre(this.data.genre).subscribe({
        next: (response) => {
          this.genre = response[0];
        },
        error: (response) => {
          console.error(response);
        },
      });
    }
  }
}
