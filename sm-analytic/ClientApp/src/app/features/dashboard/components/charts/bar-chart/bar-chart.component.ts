import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() chartLabels: Array<String>;
  @Input() chartData: Array<Object>;

  chartType: string;
  chartLegend: boolean;
  chartOptions: Object;

  constructor() { }

  ngOnInit() {

    this.chartType = "bar";
    this.chartLegend = true;
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

  }

}
