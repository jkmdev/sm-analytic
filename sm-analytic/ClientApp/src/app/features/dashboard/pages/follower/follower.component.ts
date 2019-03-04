import { Component, OnInit } from '@angular/core';
import { EngagementService } from 'app/shared/services/engagement.service';


@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent implements OnInit {

  tweets: object;
  engagementByHourData: object;
  engagementByDayData: object;

  constructor(private engagementService: EngagementService) { }

  ngOnInit() {

    var userInSession = localStorage.getItem('user');
    this.tweets = JSON.parse(userInSession);

    console.log(this.tweets);

    this.drawEngagementByHour();
    this.drawEngagementByDay();
  
  }

  drawEngagementByHour() {

    var tmp = {};

    for (var i = 0; i < 24; i++) {
      tmp[i] = `${i}:00`;
    }

    var chartData = this.tweets ? this.engagementService.calcEngagementByHour(this.tweets) : {};

    console.log(chartData);

    this.engagementByHourData = {
      'title': "Posting Times vs. Engagement (Hourly)",
      'subTitle': "Shows a relationship between when a tweet was posted and how many likes, etc it has.",
      'chartLabels': Object.values(tmp),
      'chartData': chartData
    };

  }

  drawEngagementByDay() {

    var tmp = {
      0: "Monday",
      1: "Tuesday",
      2: "Wednesday",
      3: "Thursday",
      4: "Friday",
      5: "Saturday",
      6: "Sunday"
    };

    var chartData = this.tweets ? this.engagementService.calcEngagementByDay(this.tweets) : {};

    this.engagementByDayData = {
      'title': "Posting Times vs. Engagement (Daily)",
      'subTitle': "Shows a relationship between when a tweet was posted and how many likes, etc it has.",
      'chartLabels': Object.values(tmp),
      'chartData': chartData
    };

  }

}
