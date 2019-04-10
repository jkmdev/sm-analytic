import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  options: Object[] = [
    { 'title': 'Login', 'path': 'auth' },
    { 'title': 'Register', 'path': 'auth/register' },
    { 'title': 'FAQ', 'path': 'auth/faq' }
  ];

  appTitle: string = "Social Media Analytics";
  constructor(private router: Router) { }

  ngOnInit()
  { }

  gotoMenuPage(path) {
    this.router.navigate([path]);
  }

}
