import { Directive, ElementRef, HostListener, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') mouseenter() {
    this.renderer.setStyle(this.el.nativeElement, 'text-shadow', '1px 1px #000000');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgb(240, 240, 240)');
  }

  @HostListener('mouseleave') mouseleave() {
    this.renderer.setStyle(this.el.nativeElement, 'text-shadow', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent');
  }
}
