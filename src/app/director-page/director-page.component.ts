import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * This displays info on a movie's director as a dialog.
 */
@Component({
  selector: 'app-director-page',
  templateUrl: './director-page.component.html',
  styleUrls: ['./director-page.component.scss'],
})
export class DirectorPageComponent implements OnInit {
  /**
   * @param data contains the name of the director.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { director: string },
    public fetchApiData: FetchApiDataService
  ) {}
  director: any;

  /**
   * On initiation, calls an API service function that get the data on the director
   * ({@link FetchApiDataService.getDirector}).
   */
  ngOnInit(): void {
    if (this.data) {
      this.fetchApiData.getDirector(this.data.director).subscribe({
        next: (response) => {
          this.director = response[0];
        },
        error: (response) => {
          console.error(response);
        },
      });
    }
  }
}
