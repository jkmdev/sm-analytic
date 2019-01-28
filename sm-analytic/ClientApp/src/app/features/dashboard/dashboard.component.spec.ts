import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Router} from "@angular/router";

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FollowerComponent } from './pages/follower/follower.component';
import { TrendComponent } from './pages/trend/trend.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';
import { OverviewComponent } from './pages/overview/overview.component';


import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useClass: MockRouter}
      ],
      imports: [
        DashboardRoutingModule
      ],
      declarations: [
        FollowerComponent, 
        TrendComponent, 
        SentimentComponent, 
        OverviewComponent, 
        DashboardComponent,
        SidebarComponent,
        NavbarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
