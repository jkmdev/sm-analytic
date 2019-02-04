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
  }

  gotoDashboardPage(path) {
    this.router.navigate([path]);
  }

  twitterAuth() {
    this.apiService.get('TwitterAuth')
      .subscribe(
        val => {
          console.log(val)
          window.location.href = val;
        },
        error => console.log(error)
      );
  }

}
