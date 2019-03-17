import { Component, OnInit } from '@angular/core';
import { HashtagService } from 'app/shared/services/hashtag.service';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {

  constructor(
    private hashtagService: HashtagService
  ) { }

  ngOnInit() {
  }

}
