import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Http, Headers, Response } from '@angular/http';
import { ConfigService } from '../../shared/services/utils/config.service';
import { Observable } from 'rxjs';
import { DashboardUser } from '../../shared/models/dashboard-user';

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
export class DashboardService extends BaseService
{
  currUrl: string = '';

  constructor(private http: Http, private configService: ConfigService)
  {
    super();
    this.currUrl = configService.getApiURI();
  }

  getAuthDetails(): Observable<DashboardUser> {
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);

    console.log("AuthToken = " + authToken);

    return this.http.get(this.currUrl + 'dashboard/getuserdetails', { headers })
      .map(response => response.json())
      .catch(this.handleError);
  }

}
