import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Use setTimeout to ensure the element is rendered
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 0);
  }
}