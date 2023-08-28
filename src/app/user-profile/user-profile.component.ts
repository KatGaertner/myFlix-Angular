import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userData: any = {};
  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const data: string | null = localStorage.getItem('userData');
    if (data) this.userData = JSON.parse(data);
  }
}
