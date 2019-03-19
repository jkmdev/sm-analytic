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

  mostCommonUserHashtags: any;
  publicPostsWithHashtags: any;
  hasData: boolean = false;
  private twitterDataUpdateRef: Subscription = null;

  constructor(
    private hashtagService: HashtagService,
    private twitterDataService: TwitterDataService
  ) {}

  ngOnInit() {

    var chartObject = {
      title: '',
      subTitle: '',
      chartLabels: {},
      chartData: [],
      chartType: ''
    };

    this.mostCommonUserHashtags = Object.create(chartObject);
    this.publicPostsWithHashtags = Object.create(chartObject);

    this.drawCharts();

    this.twitterDataUpdateRef = this.twitterDataService.updated.subscribe(() => {
      this.drawCharts();
    });

  }

  drawCharts() {
    var hashtagCount = this.twitterDataService.hashtagCount;
    var searchedHashtags = this.twitterDataService.searchedHashtags;

    this.mostCommonUserHashtags = this.hashtagService.mostCommonUserHashtags(hashtagCount);
    this.publicPostsWithHashtags = this.hashtagService.publicPostsWithHashtags(searchedHashtags);
  }

  



}
