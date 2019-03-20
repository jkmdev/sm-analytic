import { Component, OnInit } from '@angular/core';
import { FollowersService } from 'app/shared/services/followers.service';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  followerJoinedAt: any;
  twitterDataUpdateRef: Subscription = null;

  constructor(
    private twitterDataService: TwitterDataService,
    private followersService: FollowersService
  ) {

    var chartObject = {
      title: '',
      subTitle: '',
      chartLabels: {},
      chartData: [],
      chartType: ''
    };

    this.followerJoinedAt = Object.create(chartObject);

    this.drawCharts();

  }

  ngOnInit() {
  
    this.twitterDataUpdateRef = this.twitterDataService.updated.subscribe(() => {
      this.drawCharts();

    });

  }

  drawCharts() {

    const followers = this.twitterDataService.followers;
    this.followerJoinedAt = this.followersService.followerJoinedAtData(followers);

  }

}
