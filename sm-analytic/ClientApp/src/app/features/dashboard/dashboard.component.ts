import { Component, OnInit } from '@angular/core';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private twitterDataService: TwitterDataService) { }

  /*
    * This function checks if there are Twitter auth parameters in the url
    * If so, it attempt to authorize a user with said credentials
    */
  ngOnInit() {
    this.twitterDataService.authorizeUser();
  }

}
