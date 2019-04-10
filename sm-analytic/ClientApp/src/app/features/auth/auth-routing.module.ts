import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
        {
          path: '',
          component: LoginComponent
        },
        {
          path: 'passwordReset',
          component: PasswordResetComponent
        },
        {
          path: 'register',
          component: RegisterComponent
        },
        {
          path: 'faq',
          component: FaqComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
