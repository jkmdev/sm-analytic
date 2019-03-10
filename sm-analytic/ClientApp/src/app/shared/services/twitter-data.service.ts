import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';


@Injectable()
export class TwitterDataService {

  // init: when user signs in, stores twitter data
    // logs in user
    // parses return object
    // stores data
      // tweets, userinfo, followers, timeline 
  // clear: when user logs out? 
    // resets all data

  constructor(private apiService: ApiService) { }

    /*
   * Sends request to 'TwitterAuth' endpoint in our API
   * which returns a url that this function will redirect to
   * so that the user can authorize our app to use their credentials
   */
  twitterAuth() {
    this.apiService.get('TwitterAuth')
      .subscribe(
        val => window.location.href = val,
        error => console.log(error)
      );
  }

    /* 
   * After the user authorizes our app to use their Twitter account
   * this function will run and send a new request to our .NET API at
   * the 'ValidateTwitterAuth' endpoint, and returns the user's Twitter info
   * if they've successfully been authenticated
   */
  authorizeUser() {

    var queryParams = window.location.search;

    var args = queryParams.split("&");
    var requestBody = {};

    args.forEach((arg) => {
      var argPair = arg.split("=");
      requestBody[argPair[0]] = argPair[1];
    });

    this.apiService.post('ValidateTwitterAuth', requestBody)
      .subscribe(
        val => {
          console.log(val)
          localStorage.setItem('user', JSON.stringify(val));
          // init twitterauth object TwitterData.init(val);
        },
        error => {
          console.log(error)
        }
      );

  }

  clearSession() {
    localStorage.setItem('user', null);
    window.location.reload();
  }

}
