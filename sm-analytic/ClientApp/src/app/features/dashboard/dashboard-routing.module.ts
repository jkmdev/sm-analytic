import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';
import { FollowerComponent } from './pages/follower/follower.component';
import { TrendComponent } from './pages/trend/trend.component';
import { DashboardComponent } from './dashboard.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent, canActivate: [AuthGuard],
    children: [
        {
          path: '',
          component: OverviewComponent
        },
        {
          path: 'trend',
          component: TrendComponent
        },
        {
          path: 'sentiment',
          component: SentimentComponent
        },
        {
          path: 'follower',
          component: FollowerComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
