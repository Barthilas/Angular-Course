import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
// helper function for components.
export class HoverDirective implements OnInit {

  // same input property as selector name (not needed to specify color as another attribute on element.)
@Input() appHover: string = "red";

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(this.element.nativeElement);
  }

  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor = this.color;
    // Alternative way.
    this.renderer.setStyle(this.element.nativeElement, "backgroundColor", this.appHover);
  }

  @HostListener("mouseenter") OnMouseEnter()
  {
    this.renderer.setStyle(this.element.nativeElement, "backgroundColor", "green");
  }

  @HostListener("mouseleave") OnMouseLeave()
  {
    this.renderer.setStyle(this.element.nativeElement, "backgroundColor", "white");
  }

}
