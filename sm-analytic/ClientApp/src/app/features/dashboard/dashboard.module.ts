import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FollowerComponent } from './pages/follower/follower.component';
import { TrendComponent } from './pages/trend/trend.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { DashboardComponent } from './dashboard.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BarComponent } from './components/charts/bar-chart/bar-chart.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

import { SharedModule } from '../../shared/shared.module';
import { ApiService } from '../../shared/services/api.service';
import { ChartsModule } from 'ng2-charts';
import { LineAreaChartComponent } from './components/charts/line-area-chart/line-area-chart.component';
import { EngagementService } from 'app/shared/services/engagement.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ChartsModule
  ],
  declarations: [
    FollowerComponent, 
    TrendComponent, 
    SentimentComponent, 
    OverviewComponent, 
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    BarComponent,
    UserInfoComponent,
    LineAreaChartComponent
  ],
  providers: [
    ApiService,
    EngagementService
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
