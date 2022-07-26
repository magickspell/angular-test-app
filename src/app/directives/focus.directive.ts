import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit{

  constructor(private el: ElementRef) { }

  // хук после монтирования компонента
  ngAfterViewInit(): void {
    this.el.nativeElement.focus()
  }

  // хук перед монтированием компонента
  ngOnInit(): void {
  }
}
