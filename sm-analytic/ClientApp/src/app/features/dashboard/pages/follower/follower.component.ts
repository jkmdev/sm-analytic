import { Component, OnInit } from '@angular/core';
import { EngagementService } from 'app/shared/services/engagement.service';
import { FollowersService } from 'app/shared/services/followers.service';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent implements OnInit {

  tweets: any;
  followers: any;
  engagementByHourData: any;
  engagementByDayData: any;
  engagementTotal: any;
  followerJoinedAt: any;
  private twitterDataUpdateRef: Subscription = null;

  constructor(
    private engagementService: EngagementService,
    private twitterDataService: TwitterDataService,
    private followersService: FollowersService
  ) { }

  ngOnInit() {

    this.drawCharts();

    this.twitterDataUpdateRef = this.twitterDataService.updated.subscribe(() => {
      this.drawCharts();
    });
  
  }

  drawCharts() {
    this.tweets = this.twitterDataService.tweets;
    this.followers = this.twitterDataService.followers;
    this.drawEngagementByHour();
    this.drawEngagementByDay();
    this.drawEngagementTotal();
    this.drawFollowerJoinedAt();
  }

  drawEngagementByHour() {

    var chartLabels = {};

    for (var i = 0; i < 24; i++) {
      chartLabels[i] = `${i}:00`;
    }

    var chartData = this.tweets ? this.engagementService.calcEngagementByHour(this.tweets) : [];

    /*chartData.forEach((entry : any) => {
      entry.fillColor = "rgba(151,249,190,0.5)",
      entry.strokeColor = "rgba(255,255,255,1)",
      entry.pointColor = "rgba(220,220,220,1)",
      entry.pointStrokeColor = "#fff"
    });

    console.log(chartData);*/

    this.engagementByHourData = {
      'title': "Posting Times vs. Engagement (Hourly)",
      'subTitle': "Shows a relationship between when a tweet was posted and how many likes, etc it has for a given hour.",
      'chartLabels': Object.values(chartLabels),
      'chartData': chartData
    };

  }

  drawEngagementByDay() {

    var chartLabels = {
      0: "Monday",
      1: "Tuesday",
      2: "Wednesday",
      3: "Thursday",
      4: "Friday",
      5: "Saturday",
      6: "Sunday"
    };

    var chartData = this.tweets ? this.engagementService.calcEngagementByDay(this.tweets) : [];

    this.engagementByDayData = {
      'title': "Posting Times vs. Engagement (Daily)",
      'subTitle': "Shows a relationship between when a tweet was posted and how many likes, etc it has for a given day.",
      'chartLabels': Object.values(chartLabels),
      'chartData': chartData
    };

  }

  drawEngagementTotal() {

    var chartLabels = {
      0: "Tweets",
      1: "Retweets"
    };

    var chartData = this.tweets ? this.engagementService.calcEngagementTotal(this.tweets) : [];

    console.log(chartData);

    this.engagementTotal = {
      'title': "Total Engagement",
      'subTitle': "",
      'chartLabels': Object.values(chartLabels),
      'chartData': chartData
    };

  }

  drawFollowerJoinedAt() {

    const yearsFromCurrent = 8;
    const currentYear = new Date().getFullYear();

    var chartData = [];
    var chartLabels = {};

    if (this.followers) {
      chartData = this.followersService.joinedAt(this.followers);
      chartData[0].data.forEach((entry, index) => {
        chartLabels[index] = (currentYear - yearsFromCurrent) + index;
      });
    }

    this.followerJoinedAt = {
      'title': "When Your Followers Joined Twitter",
      'subTitle': "Shows given year a follower joined the Twitter site",
      'chartLabels': Object.values(chartLabels),
      'chartData': chartData
    };

  }

}
