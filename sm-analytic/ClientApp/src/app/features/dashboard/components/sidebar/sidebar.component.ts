import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

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
  
  ngOnInit() {

    var queryParams = window.location.search;

    if (queryParams) {
      this.authorizeUser(queryParams.substr(1));
    }

  }

  gotoDashboardPage(path) {
    this.router.navigate([path]);
  }

  twitterAuth() {
    this.apiService.get('TwitterAuth')
      .subscribe(
        val => window.location.href = val,
        error => console.log(error)
      );
  }

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
