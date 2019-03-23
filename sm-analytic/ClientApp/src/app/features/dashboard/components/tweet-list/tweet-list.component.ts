import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {

  @Input() title: string = 'Most Liked Posts';
  @Input() subTitle: string = '';
  @Input() tweets: any;

  constructor() { }

  ngOnInit() {

    this.tweets = [
      { text: "Doodlee doo", score: 45, user: "Bob", handle: "bobboy", link: "https://twitter.com/jack/status/20", date: "March 21, 2006" },
      { text: "Heidi who", score: 89, user: "Bob", handle: "bobboy", link: "https://twitter.com/jack/status/20", date: "March 21, 2006" }
    ];

  }

}
