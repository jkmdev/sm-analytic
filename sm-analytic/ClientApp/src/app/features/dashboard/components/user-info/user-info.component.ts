import { Component, Input, OnInit } from '@angular/core';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userName: string;
  profileImageUrl: string;
  private twitterDataUpdateRef: Subscription = null;

  constructor(private twitterDataService: TwitterDataService) {
    this.userName = 'userName';
    this.profileImageUrl = "../../../../assets/img/tmp.jpg";
  }

  ngOnInit() {
    this.twitterDataUpdateRef = this.twitterDataService.updated.subscribe(() => {
      var userData = this.twitterDataService.userData;
      if (userData.name) this.userName = userData.name;
      if (userData.profileImageUrl) this.profileImageUrl = userData.profileImageUrl400x400;
    });
  }

  ngOnDestroy() {
    this.twitterDataUpdateRef.unsubscribe();
  }

}
