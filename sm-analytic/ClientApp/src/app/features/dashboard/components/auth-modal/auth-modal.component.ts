import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';


@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
    private twitterDataService: TwitterDataService
  ) { }

  twitterAuth() {
    this.twitterDataService.twitterAuth();
  }

}
