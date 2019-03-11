import { Component, OnInit, Input } from '@angular/core';
import { BaseChartComponent } from '../base-chart/base-chart.component';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarComponent extends BaseChartComponent implements OnInit {

  constructor(twitterDataService: TwitterDataService) {
    super(twitterDataService);
  }

  ngOnInit() {
    this.chartType = "bar";
  }

}
