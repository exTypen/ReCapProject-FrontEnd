import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {

  constructor(elementRef: ElementRef) { 
    elementRef.nativeElement.style.backgroundColor = '#fff'
  }
}
