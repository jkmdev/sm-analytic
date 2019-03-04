import { Component, OnInit, Input } from '@angular/core';
import { EngagementService } from 'app/shared/services/engagement.service';

@Component({
  selector: 'app-line-area-chart',
  templateUrl: './line-area-chart.component.html',
  styleUrls: ['./line-area-chart.component.scss']
})
export class LineAreaChartComponent implements OnInit {

  @Input()title: string;
  @Input()subTitle: string;
  @Input() chartLabels: Array<String>;
  @Input() chartData: Array<Object>;

  chartType: string;
  chartLegend: boolean;
  chartOptions: Object;

  constructor(private engagementService: EngagementService) {}

  ngOnInit() {

    this.chartType = "line";
    this.chartLegend = true;
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

  }

}

