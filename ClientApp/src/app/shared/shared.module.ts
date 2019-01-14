import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
