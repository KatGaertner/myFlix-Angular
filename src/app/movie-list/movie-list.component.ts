import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { GenrePageComponent } from '../genre-page/genre-page.component';
import { MoviePageComponent } from '../movie-page/movie-page.component';

/**
 * This component renders a list of movies.
 *
 *  @param movies The list of movies can be handed in as a prop. If it is not handed it, it will
 * default to loading the movies that are saved as `'movies'` in `localStorage`.
 */

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  @Input() movies?: any[];

  /**
   * Called by the "synopsis" button on each movie on click.
   * Opens a dialog with the movie's summary, see {@link MoviePageComponent}.
   */
  openMovieDialog(movie: any): void {
    this.dialog.open(MoviePageComponent, {
      width: '280px',
      data: { movie },
    });
  }

  /**
   * Called by the "genre" button on each movie on click.
   * Opens a dialog with the genre's description, see {@link GenrePageComponent}.
   */
  openGenreDialog(genre: string): void {
    this.dialog.open(GenrePageComponent, {
      width: '280px',
      data: { genre },
    });
  }

  /**
   * Called by the "director" button on each movie on click.
   * Opens a dialog with the director's description, see {@link DirectorPageComponent}.
   */
  openDirectorDialog(director: string): void {
    this.dialog.open(DirectorPageComponent, {
      width: '280px',
      data: { director },
    });
  }

  /**
   * Called by the favorite-icon on each movie.
   * Checks if the Movie is on the user's list of favorites (taken from `'userData'` in `localStorage`).
   */
  isFave(movieID: string): Boolean {
    const data: string | null = localStorage.getItem('userData');
    if (data) {
      const userData: any = JSON.parse(data);
      if (userData.favorites.includes(movieID)) return true;
    }
    return false;
  }

  /**
   * Called by the favorite-icon on each movie on click.
   * Checks whether the user's list of favorites (taken from `'userData'` in `localStorage`)
   * includes the movie or not, and then either adds it to the list (see {@link setFave})
   * or removes it from it (see {@link deleteFave}).
   */
  toggleFave(movieID: string): void {
    const data: string | null = localStorage.getItem('userData');
    if (data) {
      const userData: any = JSON.parse(data);
      if (userData.favorites.includes(movieID))
        this.deleteFave(movieID, userData);
      else this.setFave(movieID, userData);
    }
  }

  /**
   * Calls an API service function to set a movie as a favorite: {@link FetchApiDataService.setFavorite}.
   * Then updated `'userData'` in `localStorage` with the updated list of favorites.
   */
  setFave(movieID: string, userData: any): void {
    this.fetchApiData.setFavorite(userData._id, movieID).subscribe({
      next: (response) => {
        localStorage.setItem(
          'userData',
          JSON.stringify({ ...userData, favorites: response })
        );
        this.snackBar.open('Added movie to favorites', 'OK', {
          duration: 5000,
        });
      },
      error: (response) => {
        console.error(response);
        this.snackBar.open(response, 'OK');
      },
    });
  }

  /**
   * Calls an API service function to remove a movie as a favorite:
   * {@link FetchApiDataService.deleteFavorite}.
   * Then updated `'userData'` in `localStorage` with the updated list of favorites.
   */
  deleteFave(movieID: string, userData: any): void {
    this.fetchApiData.deleteFavorite(userData._id, movieID).subscribe({
      next: (response) => {
        localStorage.setItem(
          'userData',
          JSON.stringify({ ...userData, favorites: response })
        );
        this.snackBar.open('Removed movie from favorites', 'OK', {
          duration: 5000,
        });
      },
      error: (response) => {
        console.error(response);
        this.snackBar.open(response, 'OK');
      },
    });
  }
}
