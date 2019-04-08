import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  errors: string;
  submitted: boolean = false;
  isBusy: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}

  // SHOULD ACCEPT USER'S REGISTERED EMAIL
  //sendHelpEmail({ value, valid }: { value: EmailMessage, valid: boolean }) {
  //  this.submitted = true;
  //  this.errors = '';
  //  this.isBusy = true;

  //  if (valid) {
  //    this.userService.sendEmail("vladimir.rozin.1618@hmail.com", Message)
  //      .finally()
  //  }
  //}

}
