import { Directive, HostListener, ElementRef } from '@angular/core';

/**
 * Makes an element scrollable on the x-axis via the mouse wheel.
 *
 * Usage:
 *
 * `<div appHorizontalScroll> [long horizontal content] </div>`
 */

@Directive({
  selector: '[appHorizontalScroll]',
})
export class HorizontalScrollDirective {
  constructor(private element: ElementRef) {}

  @HostListener('wheel', ['$event'])
  public onScroll(event: WheelEvent) {
    event.preventDefault();
    this.element.nativeElement.scrollLeft += event.deltaY;
  }
}
