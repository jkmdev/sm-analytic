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

    var hashtags = this.tweets ? this.hashtagService.hashtagCount(this.tweets) : {};

    var keys = Object.keys(hashtags);

    var chartData = [{
      data: Object.values(hashtags)
    }];

    this.mostCommonUserHashtags = {
      'title': "Most Common Hashtags from User",
      'subTitle': "Compares most used hashtags.",
      'chartLabels': Object.keys(hashtags),
      'chartData': chartData
    };

    console.log(this.mostCommonUserHashtags);

  }

  // count of posts done with that hashtag



}
