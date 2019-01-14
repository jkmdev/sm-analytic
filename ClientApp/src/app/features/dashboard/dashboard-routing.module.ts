import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';
import { FollowerComponent } from './pages/follower/follower.component';
import { TrendComponent } from './pages/trend/trend.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'sentiment', component: SentimentComponent },
  { path: 'followers', component: FollowerComponent },
  { path: 'tend', component: TrendComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
