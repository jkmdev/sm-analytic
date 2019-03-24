import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
    </div>
    <div class="modal-body">
      <p>To get started, authorize our app to use one of the following:</p>
      <button (click)="twitterAuth()" type="button" class="btn btn-warning">Authorize Twitter</button>
    </div>
  `
})
export class NgbdModalContent {

  @Input() name;

  constructor(
    public activeModal: NgbActiveModal,
    private twitterDataService: TwitterDataService
  ) { }

  twitterAuth() {
    this.twitterDataService.twitterAuth();
  }

}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  closeResult: string;
  modalOption: NgbModalOptions = {};
  modalRef: NgbModalRef;
  twitterDataUpdateRef: Subscription = null;

  constructor(
    private twitterDataService: TwitterDataService,
    private modalService: NgbModal
  ) {
    if (twitterDataService.hasNoData()) { 
      this.open();
    }
  }

  /*
    * This function checks if there are Twitter auth parameters in the url
    * If so, it attempt to authorize a user with said credentials
    */
  ngOnInit() {
    this.twitterDataService.authorizeUser();
    this.twitterDataUpdateRef = this.twitterDataService.updated.subscribe(() => {
      this.modalRef.close();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.modalRef.close();
  }

  open() {

    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.modalOption.backdropClass = 'light-blue-backdrop';
    this.modalRef = this.modalService.open(NgbdModalContent, this.modalOption);
    this.modalRef.componentInstance.name = 'World';
  }

}
