import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { TwitterDataService } from 'app/shared/services/twitter-data.service';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';

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
    this.modalRef = this.modalService.open(AuthModalComponent, this.modalOption);
    this.modalRef.componentInstance.name = 'World';
  }

  getFilter() {
    if (this.twitterDataService.hasNoData()) {
      return 'blur(5px)';
    } else {
      return ''; 
    }
    
  }

}
