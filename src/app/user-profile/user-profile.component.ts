import { Component } from '@angular/core';

/**
 * This page displays the user's data and their favorite movies.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userData: any = null;
  favoriteMovies: any[] = [];
  birthday: any = null;
  constructor() {}

  /**
   * On init, gets the user's data with {@link getUser} and calculates a list with the
   * details of the user's favorite movies with {@link getFaves}.
   */
  ngOnInit(): void {
    this.getUser();
    this.getFaves();
  }

  /**
   * Gets the user's data from `localStorage` (`'userData`) and also converts their
   * birthday into a local date format.
   */
  getUser(): void {
    const data: string | null = localStorage.getItem('userData');
    if (data) {
      this.userData = JSON.parse(data);
      if (this.userData.birthday) {
        console.log(this.userData.birthday);
        const dateFormatter = new Intl.DateTimeFormat(undefined, {
          timeZone: 'UTC',
          dateStyle: 'long',
        });
        console.log(dateFormatter.format(new Date(this.userData.birthday)));
        this.birthday = dateFormatter.format(new Date(this.userData.birthday));
      }
    }
  }

  /**
   * Makes a list of the details on the user's favorite movies.
   * The movie data is taken from the `localStorage` variable 'movies' and filtered by the user's
   * list of favorites.
   */
  getFaves(): void {
    const data: string | null = localStorage.getItem('movies');
    if (data) {
      const movies = JSON.parse(data);
      this.favoriteMovies = movies.filter((el: any) =>
        this.userData.favorites.includes(el._id)
      );
    }
  }

  /**
   * Clears `localStorage`. (The redirection to the base path/welcome page is declared in the html template.)
   */
  logout(): void {
    localStorage.clear();
  }
}
