import { Component, OnInit } from '@angular/core';
import { HashtagService } from 'app/shared/services/hashtag.service';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {

  tweets: any;
  mostCommonUserHashtags: any;
  private twitterDataUpdateRef: Subscription = null;

  constructor(
    private hashtagService: HashtagService,
    private twitterDataService: TwitterDataService
  ) { }

  ngOnInit() {

    this.drawCharts();

    this.twitterDataUpdateRef = this.twitterDataService.updated.subscribe(() => {
      this.drawCharts();
    });

  }

  drawCharts() {
    this.tweets = this.twitterDataService.tweets;
    this.drawMostCommonUserHashtags();
  }

  drawMostCommonUserHashtags() {

    var chartLabels = {
      0: "Test",
      1: "Woo"
    };

    var hashtags = {};

    if (this.tweets) {

      this.tweets.forEach((tweet) => {
        if (!tweet.retweetedTweet) {

          tweet.hashtags.forEach((hashtag) => {

            console.log(hashtag);
            console.log(hashtag.text);

            if (hashtags.hasOwnProperty(hashtag.text)) {
              hashtags[hashtag.text] += 0;
            } else {
              hashtags[hashtag.text] = 1;
            }

          });

        }
      });

    }

    var data = [];

    data = Object.values(hashtags);

    var chartData = [{
      data: data
    }];

    console.log(hashtags);

    // var chartData = this.tweets ? this.engagementService.calcEngagementByDay(this.tweets) : [];

    this.mostCommonUserHashtags = {
      'title': "Most Common Hashtags from User",
      'subTitle': "Shows the most commonly used hashtags by this user.",
      'chartLabels': Object.values(chartLabels),
      'chartData': chartData
    };

  }

}
