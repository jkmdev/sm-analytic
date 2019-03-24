import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FollowerComponent } from './pages/follower/follower.component';
import { TrendComponent } from './pages/trend/trend.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { DashboardComponent, NgbdModalContent } from './dashboard.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BaseChartComponent } from './components/charts/base-chart/base-chart.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HashtagService } from 'app/shared/services/hashtag.service';
import { HelpComponent } from './pages/help/help.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { EngagementService } from 'app/shared/services/engagement.service';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';
import { FollowersService } from 'app/shared/services/followers.service';
import { ApiService } from '../../shared/services/api.service';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';

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
    UserInfoComponent,
    BaseChartComponent,
    FaqComponent,
    HelpComponent,
    ProfileComponent,
    TweetListComponent,
    AuthModalComponent
  ],
  providers: [
    ApiService,
    EngagementService,
    TwitterDataService,
    FollowersService,
    HashtagService
  ],
  exports: [
    DashboardComponent
  ],
  entryComponents: [
    AuthModalComponent
  ]
})
export class DashboardModule { }
