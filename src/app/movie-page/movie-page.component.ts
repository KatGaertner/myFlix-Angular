import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * This displays a movie's summary as a dialog.
 */
@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent {
  /**
   * @param data contains the data of the movie. It needs to include a title and a summary.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { movie: { title: string; summary: string } }
  ) {}
}
