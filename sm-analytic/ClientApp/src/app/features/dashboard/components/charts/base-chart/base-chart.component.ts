import { Component, Input } from '@angular/core';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';

@Component({
  selector: 'app-base-chart',
  templateUrl: './base-chart.component.html'
})
export class BaseChartComponent {

  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() chartLabels: Array<String> = [];
  @Input() chartData: Array<Object> = [];
  @Input() chartLegend: boolean = true;
  @Input() chartType: string = '';
  @Input() chartOptions: Object = {};

  hasData: boolean = false;

  constructor(private twitterDataService: TwitterDataService) {

    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    if (this.twitterDataService.userData) {
      this.hasData = true;
    }

  }

}

