import { Directive, HostListener, ElementRef } from '@angular/core';

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
