import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { EmailMessage } from 'app/shared/models/email-message';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  errors: string = '';
  submitted: boolean = false;
  isBusy: boolean = false;
  messageBack: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {}

  // SHOULD ACCEPT USER'S REGISTERED EMAIL
  sendHelpEmail({ value, valid }: { value: EmailMessage, valid: boolean }) {
    this.submitted = true;
    this.errors = '';
    this.isBusy = true;
    this.messageBack = false;
    console.log("IN sendHelpEmail()");
    console.log("EmailMessage: " + value.Message);
    if (valid) {
      this.userService.sendEmail('vladimir.rozin.1618@gmail.com', value.Message)
        .finally(() => this.isBusy = false)
        .subscribe(result => {
          if (result) {
            this.messageBack = true;
          }

        },
        error => console.log(error));

    }


  }

}
