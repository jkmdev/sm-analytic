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

  hashtagCount: object;
  searchedHashtags: object;
  mostCommonUserHashtags: any;
  publicPostsWithHashtags: any;
  hasData: boolean = false;
  private twitterDataUpdateRef: Subscription = null;

  constructor(
    private hashtagService: HashtagService,
    private twitterDataService: TwitterDataService
  ) {}

  ngOnInit() {

    this.drawCharts();

    this.twitterDataUpdateRef = this.twitterDataService.updated.subscribe(() => {
      this.drawCharts();
    });

  }

  drawCharts() {
    this.hashtagCount = this.twitterDataService.hashtagCount;
    this.searchedHashtags = this.twitterDataService.searchedHashtags;
    this.drawMostCommonUserHashtags();
    this.drawPublicPostsWithHashtags();
  }

  drawMostCommonUserHashtags() {

    var chartData = [];
    var chartLabels = [];
    
    if (this.hashtagCount) {
      chartData = [{
        data: Object.values(this.hashtagCount)
      }];
      chartLabels = Object.keys(this.hashtagCount);
    }

    this.mostCommonUserHashtags = {
      'title': "Most Common Hashtags from User",
      'subTitle': "Compares most used hashtags.",
      'chartLabels': chartLabels,
      'chartData': chartData
    };

  }

  drawPublicPostsWithHashtags() {

    var chartData = [];
    var chartLabels = [];

    if (this.searchedHashtags) {
      chartData = [{
        data: Object.values(this.searchedHashtags)
      }];
      chartLabels = Object.keys(this.searchedHashtags);
    }

    this.publicPostsWithHashtags = {
      'title': "Amount of Posts that use Your Hashtags",
      'subTitle': "Shows the amount of (popular) posts made by other users that use hashtags you commonly use.",
      'chartLabels': chartLabels,
      'chartData': chartData
    };

  }



}
