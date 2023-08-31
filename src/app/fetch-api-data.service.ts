import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

const apiUrl = 'https://movie-api-93299-83ca7447ffdb.herokuapp.com';

/**
 * Provides interaction with the movie database. For the documentation there, see:
 * [Movie API Documentation](https://movie-api-93299-83ca7447ffdb.herokuapp.com/documentation.html)
 *
 * Without a token, only `registerUser()` and `loginUser()` will successfully fetch.
 *
 * `loginUser()` returns an object with a token that needs to be stored in `localStorage` as `'token'`.
 * The other endpoints will retrieve that token from `localStorage`.
 */

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   */
  constructor(private http: HttpClient) {}

  /**
   * Registers a user
   * @param userData - data of the user that is to be registered
   * @returns resolves to an object with the new user's data
   */
  public registerUser(userData: {
    name: string;
    password: string;
    email: string;
    birthday?: string;
  }): Observable<any> {
    return this.http
      .post(apiUrl + '/users', userData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Gets a list of all movies and their details
   * @returns resolves to a list of all movies as objects
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets details on a single movie
   * @param title - title of the movie
   * @returns resolves to an object with the movie's details
   */
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets details on a single genre
   * @param genre - name of the genre
   * @returns resolves to an object with the genre's details
   */
  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genres/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets details on a single director
   * @param director - name of the director
   * @returns resolves to an object with the director's details
   */
  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/directors/' + director, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Updates a user's details
   * @param userData - new data of the user
   * @param userData.id - user ID
   * @param [userData.name] - new username
   * @param [userData.password] - new password
   * @param [userData.email] - new e-mail
   * @param [userData.birthday] - new birthday
   * @returns resolves to an object with the user's new data
   */
  public updateUser(userData: {
    id: string;
    name?: string;
    password?: string;
    email?: string;
    birthday?: string;
  }): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + '/users/' + userData.id, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Logs in a user
   * @param userData - object with the username and password
   * @param userData.username - username
   * @param userData.password - password
   * @returns resolves to an object with the user's data as well as a JWT
   */
  public loginUser(userData: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post(apiUrl + '/login', userData)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets the current user's data based on the user ID in the JWT token
   * @returns resolves to an object with the user's data
   */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Adds a movie to user's list of favorites
   * @param userID - user ID
   * @param movieID - movie ID
   * @returns resolves to a list of the user's new list of favorites
   */
  public setFavorite(userID: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + '/users/' + userID + '/movies/' + movieID, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Removes a movie from user's list of favorites
   * @param userID - user ID
   * @param movieID - movie ID
   * @returns resolves to a list of the user's new list of favorites
   */
  public deleteFavorite(userID: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/' + userID + '/movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Removes a user from the database
   * @param userID - user ID
   * @returns resolves to a message confirming the deletion
   */
  public deleteUser(userID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + '/users/' + userID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // client-sidee error
      console.error('Some error occurred:', error.error.message);
      throw new Error('Something bad happened; please try again later.');
    } else {
      // backend error
      console.error(
        `Error status code ${error.status}, ` +
          `Error body is: ${JSON.stringify(error.error)}`
      );
      // extracting the message from (a messy...) backend
      let response: string;
      if (error.error.errors) {
        response = error.error.errors.map((e: any) => e.msg).join('\n');
      } else if (error.error.info) {
        response = error.error.info.message;
      } else {
        response = error.error;
      }
      throw new Error(response);
    }
  }
}
