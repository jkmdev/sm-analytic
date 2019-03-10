import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TwitterDataService } from 'app/shared/services/twitter-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private twitterDataService: TwitterDataService
  ) { }

  userInfo = {
    userName: "userName",
    profileImageUrl: "../../../../assets/img/tmp.jpg"
  };

  options : Object[] = [
    { 'title':'Overview', 'path':'dashboard/' },
    { 'title':'Sentiment', 'path':'dashboard/sentiment' },
    { 'title':'Trends', 'path':'dashboard/trend' },
    { 'title':'Followers', 'path':'dashboard/follower' },
  ];

  twitterAuth = this.twitterDataService.twitterAuth;
  clearSession = this.twitterDataService.clearSession;

  /*
   * This function checks if there are Twitter auth parameters in the url
   * If so, it attempt to authorize a user with said credentials
   */
  ngOnInit() {
    this.twitterDataService.authorizeUser();
  }

  /*
   * This component controls the routing to the various dashboard pages
   * This function handles the page redirection
   */
  gotoDashboardPage(path) {
    this.router.navigate([path]);
  }

}
