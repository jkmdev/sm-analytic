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
  @Input() chartOptions: Object;

  chartType: string;

  constructor() { }

  ngOnInit() {

    this.chartType = "bar";
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      legend: {
        display: true,
        position: 'left'
      }
    };

  }

}
