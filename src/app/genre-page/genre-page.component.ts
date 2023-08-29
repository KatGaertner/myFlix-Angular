import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss'],
})
export class GenrePageComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genre: string },
    public fetchApiData: FetchApiDataService
  ) {}
  genre: any;

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
