import { Component, OnInit } from '@angular/core';
import { EngagementService } from 'app/shared/services/engagement.service';
import { FollowersService } from 'app/shared/services/followers.service';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';
import { Subscription } from 'rxjs/Subscription';

interface Chart {
  title: string,
  subTitle: string,
  chartLabels: object,
  chartData: Array<object>,
  chartType: string
}

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent implements OnInit {

  private engagementByHourData: any;
  private engagementByDayData: any;
  private engagementTotal: any;
  private followerJoinedAt: any;
  private twitterDataUpdateRef: Subscription = null;

  constructor(
    private engagementService: EngagementService,
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

    this.engagementByHourData = Object.create(chartObject);
    this.engagementByDayData = Object.create(chartObject);
    this.engagementTotal = Object.create(chartObject);
    this.followerJoinedAt = Object.create(chartObject);

    this.drawCharts();

  }

  ngOnInit() {

    this.twitterDataUpdateRef = this.twitterDataService.updated.subscribe(() => {
      this.drawCharts();
    });

  }

  drawCharts() {

    const tweets = this.twitterDataService.tweets;
    const followers = this.twitterDataService.followers;

    this.engagementByHourData = this.engagementService.engagementByHourData(tweets);
    this.engagementByDayData = this.engagementService.engagementByDayData(tweets);
    this.engagementTotal = this.engagementService.engagementTotalData(tweets);
    this.followerJoinedAt = this.followersService.followerJoinedAtData(followers);

  }

}
