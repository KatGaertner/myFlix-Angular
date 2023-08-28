import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

const apiUrl = 'https://movie-api-93299-83ca7447ffdb.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // POST 	/users 	adds a new user
  public registerUser(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + '/users', userData)
      .pipe(catchError(this.handleError));
  }

  // GET 	/movies 	returns a list of all movies
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

  // GET 	/movies/[title] 	returns data about a single movie by title
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

  // GET 	/genres/[name] 	returns data about a genre by name
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

  // GET 	/directors/[name] 	returns data about a director by name
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
  // PUT 	/users/[ID] 	updates user data by user ID
  public updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + '/users/' + userData.id, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // POST 	/login 	logs in user
  public loginUser(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + '/login', userData)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET 	/users 	gets user data based on the user ID in JWT token
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

  // POST 	/users/[userID]/movies/[movieID] 	adds a movie to a user's list of favorites
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

  // DELETE 	/users/[userID]/movies/[movieID] 	removes a movie from a user's list of favorites
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

  // DELETE 	/users/[ID] 	removes a user by ID
  public deleteUser(userID: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + '/users/' + userID + '/movies/' + movieID, {
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
