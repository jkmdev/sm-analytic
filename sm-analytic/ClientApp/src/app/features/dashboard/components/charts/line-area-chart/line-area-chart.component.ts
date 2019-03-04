import { Component, OnInit } from '@angular/core';
import { EngagementService } from 'app/shared/services/engagement.service';

@Component({
  selector: 'app-line-area-chart',
  templateUrl: './line-area-chart.component.html',
  styleUrls: ['./line-area-chart.component.scss']
})
export class LineAreaChartComponent implements OnInit {

  title: string;
  subTitle: string;
  tweets: object;
  chartLabels: Array<String>;
  chartData: Array<Object>;

  constructor(private engagementService: EngagementService) {

    this.title = "Peak Engagement Times";
    this.subTitle = "Shows a relationship between when a tweet was posted and how many likes, etc it has."

  }

  ngOnInit() {

    var userInSession = localStorage.getItem('user');
    var tweets = JSON.parse(userInSession);
    if (tweets) this.chartData = this.engagementService.calcEngagementByDay(tweets);

    console.log(tweets);

    var tmp = {};

    for (var i = 0; i < 24; i++) {
      tmp[i] = `${i}:00`;
    }

    this.chartLabels = Object.values(tmp);

  }

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public chartType = 'line';
  public chartLegend = true;

}


  // enagement by the hour calcEngagementByHour(Object tweets, func filterDate)

    // tweetNum = tweets.length();

    // loop through tweets

      // engagement = tweet.likesCount + tweet.numResponses;
      // obj[filterWeek(tweet.timePosted)] = engagement / tweetNum;
      // time object
      /**
       * {
       *    "0" : 2,
       *    "0" : 4
       * }
       * */

      // return time object

  // engagement by the day calcEngagementByWeek(Object tweets, func filterDate)

      // tweetNum = tweets.length();

      // loop through tweets

      // engagement = tweet.likesCount + tweet.numResponses;
      // obj[filterWeek(tweet.timePosted)] = engagement / tweetNum;
      // time object
      /**
       * {
       *    "0" : 2,
       *    "-1" : 4
       * }
       * */

      // return time object

  // total engagement for all tweets calcEngagementTotal(Object tweets, func filterDate)

      // tweetNum = tweets.length();

      // loop through tweets

      // engagement = tweet.likesCount + tweet.numResponses;
      // if filterDate == null obj[0] = engagement / tweetNum;
      // else obj[filterWeek(tweet.timePosted)] = engagement / tweetNum;
      // time object
      /**
       * {
       *    "0" : 6
       * }
       * */

      // return time object
