import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../../../../shared/services/api.service';

import { DashboardUser } from '../../../../shared/models/dashboard-user';
import { DashboardService } from '../../dashboard.service';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserService } from '../../../../shared/services/user.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  dashboardUser: DashboardUser;

  constructor(private router: Router, private apiService: ApiService, private dashboardService: DashboardService) { }

  userInfo = {
    userName: "userName",
    profileImageUrl: ""
  };

  options : Object[] = [
    { 'title':'Overview', 'path':'dashboard/' },
    { 'title':'Sentiment', 'path':'dashboard/sentiment' },
    { 'title':'Trends', 'path':'dashboard/trend' },
    { 'title':'Followers', 'path':'dashboard/follower' },
  ];

  /*
   * This function checks if there are Twitter auth parameters in the url
   * If so, it attempt to authorize a user with said credentials
   */
  ngOnInit()
  {
    
    
    var queryParams = window.location.search;
    if (queryParams)
    {
      this.authorizeUser(queryParams.substr(1));
    }

    this.dashboardService.getAuthDetails()
      .subscribe((dashboardUser: DashboardUser) => {
        this.dashboardUser = dashboardUser;
        console.log(dashboardUser);
        console.log(this.dashboardUser.email);
        this.userInfo.userName = this.dashboardUser.email;
      },
      error => { });

  }

  /*
   * This component controls the routing to the various dashboard pages
   * This function handles the page redirection
   */
  gotoDashboardPage(path) {
    this.router.navigate([path]);
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
  authorizeUser(queryParams) {

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
          this.userInfo.userName = val.name;
          this.userInfo.profileImageUrl = val.profileImageUrl;
        },
        error => {
          console.log(error)
        }
      );

  }

}
