import { Component, OnInit, Input } from '@angular/core';
import { BaseChartComponent } from '../base-chart/base-chart.component';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';

@Component({
  selector: 'app-line-area-chart',
  templateUrl: './line-area-chart.component.html',
  styleUrls: ['./line-area-chart.component.scss']
})
export class LineAreaChartComponent extends BaseChartComponent implements OnInit {

  constructor(twitterDataService: TwitterDataService) {
    super(twitterDataService);
  }

  ngOnInit() {
    this.chartType = "line";
  }

}

