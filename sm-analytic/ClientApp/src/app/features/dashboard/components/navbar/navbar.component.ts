import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  appTitle: string = "Social Media Analytics";

  ngOnInit() {
  }

  faq() {
    this.router.navigate(['faq']);
  }

  options: Object[] = [
    { 'title': 'Profile', 'path': 'dashboard/profile' },
    { 'title': 'FAQ', 'path': 'dashboard/faq' },
    { 'title': 'Help', 'path': 'dashboard/help' },
  ];

  gotoMenuPage(path) {
    this.router.navigate([path]);
  }

}
