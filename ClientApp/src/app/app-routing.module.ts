import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { OverviewComponent } from './features/dashboard/pages/overview/overview.component';
import { SentimentComponent } from './features/dashboard/pages/sentiment/sentiment.component';
import { FollowerComponent } from './features/dashboard/pages/follower/follower.component';
import { TrendComponent } from './features/dashboard/pages/trend/trend.component';

const routes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'dashboard'
    //   },
    //   {
    //     path: 'dashboard',
    //     component: DashboardComponent,
    //     children: [
    //         {
    //             path: '',
    //             component: OverviewComponent
    //         },
    //         {
    //             path: 'trend',
    //             component: TrendComponent
    //         },
    //         {
    //             path: 'sentiment',
    //             component: SentimentComponent
    //         },
    //         {
    //             path: 'follower',
    //             component: FollowerComponent
    //         }
    //     ]
    // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
