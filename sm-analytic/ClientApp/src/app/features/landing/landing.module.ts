import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { LandingComponent } from './landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: 'landing',
        component: LandingComponent
      }
    ])
  ],
  declarations: [LandingComponent, NavbarComponent]
})
export class LandingModule { }
