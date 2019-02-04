import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) {}

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
    var req = {};

    args.forEach((arg) => {
      var argPair = arg.split("=");
      req[argPair[0]] = argPair[1];
    });

    console.log(req);

    this.apiService.post('ValidateTwitterAuth')
      .subscribe(
        val => console.log(val),
        error => console.log(error)
      );

  }
}
