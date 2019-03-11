import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'base-chart',
  template: ''
})
export class BaseChartComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() chartLabels: Array<String>;
  @Input() chartData: Array<Object>;

  chartType: string;
  chartLegend: boolean;
  chartOptions: Object;

  constructor() { }

  ngOnInit() {

    this.chartLegend = true;
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

  }

}

