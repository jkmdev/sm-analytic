import { Directive, ElementRef, Renderer, OnInit } from "@angular/core";

@Directive({ selector: '[tmFocus]' })

export class myFocus implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer) {
    
  }

  ngOnInit() {
    this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
  }
}
