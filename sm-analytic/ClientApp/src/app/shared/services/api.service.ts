import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { _throw as throwError } from 'rxjs/observable/throw';
import { environment } from 'environments/environment';

/*
 * Service for interacting for out out .NET Core API
 * Contains functions that make get and post requests easier to do in our controllers
 * All request urls here follow the format ${environment.api_url}${path}
 * ${environment.api_url} will be http://localhost:5000 in dev, the myseneca vm url in prod
 * ${path} is passed into the function as an argument (e.g. 'TwitterAuth')
 */
@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  /*
   * Formats get requests to our .NET Core API and handles associated get request errors
   * Returns data from ${environment.api_url}${path} in the .NET Core API
   */
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { responseType: 'text' })
      .pipe(catchError(this.formatErrors));
  }

  /*
   * Formats post requests to our .NET Core API and handles associated post request errors
   * Posts data to ${environment.api_url}${path} in the .NET Core API
   */
  post(path: string, body: Object = {}): Observable<any> {

    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        })
      }
    )
    .pipe(catchError(this.formatErrors));
  }

}
