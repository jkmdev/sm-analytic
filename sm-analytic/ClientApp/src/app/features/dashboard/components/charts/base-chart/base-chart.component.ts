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

  }

  ngOnInit() {

    this.hasData = this.chartDataHasData();

  }

  chartDataHasData() {

    var hasData = true;

    function elementHasData(ele) {

      var hasData = true;

      console.log(ele.data);

      if (ele.data.length == 0) {
        hasData = false;
      } else {
        hasData = ele.data.every((x) => { return x.length == 0 });
      }
      
      return hasData;

    }

    if (this.chartData.length == 0) {
      hasData = false;
    } else if (this.chartData.every(elementHasData)) {
      hasData = false;
    }

    return hasData;

  }

}

