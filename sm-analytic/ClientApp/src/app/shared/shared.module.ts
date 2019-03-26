import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { myFocus } from './services/utils/focus.directive';
//import { EmailValidator } from './services/utils/email-validation.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InfoCardComponent,
    myFocus
  ],
  exports: [
    InfoCardComponent,
    myFocus
  ]
})
export class SharedModule { }
