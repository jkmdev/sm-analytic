import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { FaqComponent } from './pages/faq/faq.component';

import { NavbarComponent } from './components/navbar/navbar.component';

import { UserService } from '../../shared/services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { EmailValidator } from '../../shared/services/utils/email-validation.directive';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    SharedModule
  ],
  declarations: [
    AuthComponent, 
    RegisterComponent, 
    LoginComponent,
    FaqComponent,
    NavbarComponent,
    PasswordResetComponent,
    EmailValidator
  ],
  providers: [
    UserService
  ],
  exports: [
    AuthComponent,
    NavbarComponent
  ]
})
export class AuthModule { }
