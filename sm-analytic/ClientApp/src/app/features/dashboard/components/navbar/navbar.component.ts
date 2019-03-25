import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { DashboardUser } from '../../../../shared/models/dashboard-user';
import { DashboardService } from '../../dashboard.service';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserService } from '../../../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  appTitle: string = "Social Media Analytics";
  dashboardUser: DashboardUser;
  dashboardUserFN: string = "";
  dashboardUserLN: string = "";

  private dashboardUserSubscr: Subscription = null;
  
  constructor(private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit()
  {
    this.dashboardUserSubscr = this.dashboardService.getAuthDetails().subscribe((dashboardUser: DashboardUser) =>
    {
      this.dashboardUser   = dashboardUser;
      this.dashboardUserFN = dashboardUser.firstName;
      this.dashboardUserLN = dashboardUser.lastName;

    },
        error => { });


  }

  ngOnDestroy()
  {
    this.dashboardUserSubscr.unsubscribe();
  }

  faq() {
    this.router.navigate(['faq']);
  }

  options: Object[] = [
    { 'title': 'Profile', 'path': 'dashboard/profile' },
    { 'title': 'FAQ', 'path': 'dashboard/faq' },
    { 'title': 'Help', 'path': 'dashboard/help' }
  ];

  gotoMenuPage(path) {
    this.router.navigate([path]);
  }

}
