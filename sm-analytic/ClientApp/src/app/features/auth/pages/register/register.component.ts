import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../../../../shared/services/user.service';
import { RegisterCredentials } from '../../../../shared/models/register-credentials'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errors: string;  
  submitted: boolean = false;
  isBusy: boolean;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
  }

  register({ value, valid }: { value: RegisterCredentials, valid: boolean }) {
    this.submitted = true;
    this.errors = '';
    this.isBusy = true;
    if(valid)
    {
      this.userService.register(value.FirstName, value.LastName, value.Email, value.DOB, value.Password, value.PasswordConfirm)
        .finally(() => this.isBusy = false)
        .subscribe(
          result  => {if(result){
              this.router.navigate(['auth'],{queryParams: {newUser: true, Email:value.Email}});                         
          }},
          errors =>  this.errors = errors);
    }     
  }

  login() {
    this.router.navigate(['auth']);
  }

}
