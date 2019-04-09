import { Injectable, enableProdMode } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { RegisterCredentials } from '../models/register-credentials';
import { ConfigService } from '../services/utils/config.service';
import { environment } from '../../../environments/environment';
import { Jwt } from '../models/jwt'

import { BaseService } from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx'; 

// Add the RxJS Observable operators we need in this app.
// Statics
import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService extends BaseService {

  baseUrl: string = '';

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: Http, private configService: ConfigService)
  {
      super();
      this.loggedIn = !!localStorage.getItem('auth_token');
      this._authNavStatusSource.next(this.loggedIn);
      this.baseUrl = configService.getApiURI();
      console.log("Environment URL = " + this.baseUrl);
  }

  register(FirstName: string, LastName: string, Email: string, DOB: Date, Password: string, PasswordConfirm: string)
        : Observable<RegisterCredentials> 
  {
      let body = JSON.stringify({ FirstName, LastName, Email, DOB, Password, PasswordConfirm });
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "account/register", body, options)
          .map(res => true)
          .catch(this.handleError); 
  }  

  login(Email, Password){
    let headers = new Headers({ 'Content-Type': 'application/json' });

     return this.http.post(
       this.baseUrl + 'account/login',
       JSON.stringify({ Email, Password }),
       { headers }
     )
       .map(res => res.json())
       .map(res => {
         localStorage.setItem('auth_token', res.auth_token);
         this.loggedIn = true;
         this._authNavStatusSource.next(true);
         return true;
       })
       .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  sendEmail(Destination: string, Message: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    console.log("Object to be sent: " + JSON.stringify({ Destination, Message }));
    return this.http.post(
      this.baseUrl + 'dashboard/sendemail',
      JSON.stringify({ Destination, Message }),
      { headers }
    )
      .map(res => res.json())
      .map(res => { console.log(".NET returned: " + res); })
      .catch(this.handleError);
  }
}
