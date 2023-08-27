import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.loginUser(this.userData).subscribe({
      next: (response) => {
        this.dialogRef.close();
        localStorage.setItem('userData', JSON.stringify(response.userData));
        localStorage.setItem('token', response.token);
        this.snackBar.open('Successfully logged in!', 'OK', { duration: 3000 });
      },
      error: (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', { duration: 3000 });
      },
    });
  }
}
