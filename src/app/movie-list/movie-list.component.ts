import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { GenrePageComponent } from '../genre-page/genre-page.component';
import { MoviePageComponent } from '../movie-page/movie-page.component';

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

  openMovieDialog(movie: any): void {
    this.dialog.open(MoviePageComponent, {
      width: '280px',
      data: { movie },
    });
  }

  openGenreDialog(genre: string): void {
    this.dialog.open(GenrePageComponent, {
      width: '280px',
      data: { genre },
    });
  }

  openDirectorDialog(director: string): void {
    this.dialog.open(DirectorPageComponent, {
      width: '280px',
      data: { director },
    });
  }

  isFave(movieID: string): Boolean {
    const data: string | null = localStorage.getItem('userData');
    if (data) {
      const userData: any = JSON.parse(data);
      if (userData.favorites.includes(movieID)) return true;
    }
    return false;
  }

  toggleFave(movieID: string): void {
    const data: string | null = localStorage.getItem('userData');
    if (data) {
      const userData: any = JSON.parse(data);
      if (userData.favorites.includes(movieID))
        this.deleteFave(movieID, userData);
      else this.setFave(movieID, userData);
    }
  }

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
