import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';
import { FollowerComponent } from './pages/follower/follower.component';
import { TrendComponent } from './pages/trend/trend.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
