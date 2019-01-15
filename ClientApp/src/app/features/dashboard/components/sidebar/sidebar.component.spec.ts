import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {Router} from "@angular/router";

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useClass: MockRouter}
      ],
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create sidebar component', () => {
    expect(component).toBeTruthy();
  });

  it('should display all links', () => {
    fixture.detectChanges();
    var options = fixture.debugElement.queryAll(By.css('.option'));
    expect(options.length).toEqual(component.options.length);
  });    

  it('should trigger function when link is clicked', () => {   

    spyOn(component, 'gotoDashboardPage');
    let li = fixture.debugElement.query(By.css('.option'));
    li.triggerEventHandler('click', null);
    fixture.whenStable().then(() => {
      expect(component.gotoDashboardPage).toHaveBeenCalled();
    });
  });

});
