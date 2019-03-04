import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userName: string;
  profileImageUrl: string;

  constructor() {
    this.userName = 'userName';
    this.profileImageUrl = "../../../../assets/img/tmp.jpg";
  }

  ngOnInit() {
      var userInSession = localStorage.getItem('user');
      var user = JSON.parse(userInSession);
      if (user) {
        if (user.name) this.userName = user.name;
        if (user.profileImageUrl) this.profileImageUrl = user.profileImageUrl400x400;
      }
      
  }

}
