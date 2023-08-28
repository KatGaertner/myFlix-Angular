import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) {}
  @Input() movies?: any[];

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
