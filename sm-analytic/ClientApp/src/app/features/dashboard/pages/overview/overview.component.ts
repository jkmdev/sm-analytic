import { Component, OnInit } from '@angular/core';
import { FollowersService } from 'app/shared/services/followers.service';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';
import { Subscription } from 'rxjs/Subscription';
import { EngagementService } from 'app/shared/services/engagement.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  followerJoinedAt: any;
  topUserTweets: any;
  twitterDataUpdateRef: Subscription = null;

  constructor(
    private twitterDataService: TwitterDataService,
    private followersService: FollowersService,
    private engagementService: EngagementService
  ) {

    var chartObject = {
      title: '',
      subTitle: '',
      chartLabels: {},
      chartData: [],
      chartType: ''
    };

    this.followerJoinedAt = Object.create(chartObject);
    this.topUserTweets = Object.create(chartObject);

    this.drawCharts();

  }

  ngOnInit() {
  
    this.twitterDataUpdateRef = this.twitterDataService.updated.subscribe(() => {
      this.drawCharts();
    });

  }

  drawCharts() {

    const followers = this.twitterDataService.followers;
    const tweets = this.twitterDataService.tweets;
    this.followerJoinedAt = this.followersService.followerJoinedAtData(followers);
    this.topUserTweets = this.engagementService.topUserTweets(tweets);

  }

}
