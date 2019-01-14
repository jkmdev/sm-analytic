import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module'

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FollowerComponent } from './pages/follower/follower.component';
import { TrendComponent } from './pages/trend/trend.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    FollowerComponent, 
    TrendComponent, 
    SentimentComponent, 
    OverviewComponent, 
    DashboardComponent
  ], 
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
