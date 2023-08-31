import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * This is a dialog with a form that allows the user to register.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * @param userData the parameter `birthday` is optional in {@link FetchApiDataService.registerUser}
   * and the corresponding API endpoint, but it is initiated as an empty string for ease.
   */
  @Input() userData = { name: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Calls a API service function to register the user: {@link FetchApiDataService.registerUser}
   */
  registerUser(): void {
    this.fetchApiData.registerUser(this.userData).subscribe({
      next: (response) => {
        this.dialogRef.close();
        console.log(response);
        this.snackBar.open('Successfully signed up!', 'OK', { duration: 5000 });
      },
      error: (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK');
      },
    });
  }
}
