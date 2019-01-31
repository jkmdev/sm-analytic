import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() image: string;

  constructor() { 
    this.title = "Lorem Ipsum";
    this.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a ipsum sapien" +
    "Nullam pretium purus commodo arcu placerat semper" +
    "Vestibulum dignissim iaculis convallis. Praesent nec enim quis lorem tempor sodales.";
    this.image = "../../../assets/img/tmp.jpg";
  }

  ngOnInit() {
  }

}
