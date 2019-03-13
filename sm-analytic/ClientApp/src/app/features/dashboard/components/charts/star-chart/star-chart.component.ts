import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from '../base-chart/base-chart.component';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';

@Component({
  selector: 'app-star-chart',
  templateUrl: './star-chart.component.html',
  styleUrls: ['./star-chart.component.scss']
})
export class StarChartComponent extends BaseChartComponent implements OnInit {

  constructor(twitterDataService: TwitterDataService) {
    super(twitterDataService);
  }

  ngOnInit() {
    this.chartType = "radar";
  }

}
