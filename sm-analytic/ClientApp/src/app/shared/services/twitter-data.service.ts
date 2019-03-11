import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TwitterDataService {

  // init: when user signs in, stores twitter data
    // logs in user
    // parses return object
    // stores data
      // tweets, userinfo, followers, timeline 
  // clear: when user logs out? 
    // resets all data

  tweets;
  public userData;
  public updated = new Subject<void>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    /* console.log("hmmmmmmmmmmmmmmmmmmmm");
    this.userData = localStorage.getItem('userData');
    this.tweets = localStorage.getItem('tweets');
    console.log(this.userData);
    this.updated.next(); */
  }

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

    if (queryParams) {

      var args = queryParams.split("&");
      var requestBody = {};

      args.forEach((arg) => {
        var argPair = arg.split("=");
        requestBody[argPair[0]] = argPair[1];
      });

      this.apiService.post('ValidateTwitterAuth', requestBody)
        .subscribe(
          val => {
            this.userData = val[0].value;
            this.tweets = val[1].value;
            this.updated.next();
            localStorage.setItem('userData', JSON.stringify(this.userData));
            localStorage.setItem('tweets', JSON.stringify(this.tweets));
          },
          error => {
            console.log(error)
          }
        );

    }

  }

  clearSession() {
    this.userData = {};
    this.tweets = [];
    window.location.reload();
  }

}
