import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';


@Component({
  selector: 'app-auth-modal',
  //templateUrl: './auth-modal.component.html',
  //styleUrls: ['./auth-modal.component.scss'],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
    </div>
    <div class="modal-body">
      <div style="display:flex-column; align-items: center; justify-content: center;">
        <p>To get started, authorize our app to use one of the following:</p>
        <button (click)="twitterAuth()" type="button" class="btn btn-primary">Login with Twitter</button>
        <button type="button" class="btn btn-secondary" disabled>Login with Facebook</button>
        <button type="button" class="btn btn-secondary" disabled>Login with Instagram</button>
      </div>
    </div>
  `
})
export class AuthModalComponent {

  @Input() name;

  constructor(
    public activeModal: NgbActiveModal,
    private twitterDataService: TwitterDataService
  ) { }

  twitterAuth() {
    this.twitterDataService.twitterAuth();
  }

}
