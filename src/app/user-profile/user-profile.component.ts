import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userData: any = null;
  favoriteMovies: any[] = [];
  birthday: any = null;
  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getUser();
    this.getFaves();
  }

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

  getFaves(): void {
    const data: string | null = localStorage.getItem('movies');
    if (data) {
      const movies = JSON.parse(data);
      this.favoriteMovies = movies.filter((el: any) =>
        this.userData.favorites.includes(el._id)
      );
    }
  }

  logout(): void {
    localStorage.clear();
  }
}
