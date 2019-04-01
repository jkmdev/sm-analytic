import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {

  title: string = 'Top Posts';
  subTitle: string = 'Your posts with the most combined likes and retweets.';

  constructor() { }

  ngOnInit() {
  }

}
