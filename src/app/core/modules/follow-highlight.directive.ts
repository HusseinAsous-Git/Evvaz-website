import { Directive, OnInit, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFollowHighlight]'
})
export class FollowHighlightDirective implements OnInit{

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
 @Input() toggle : boolean = false;
  ngOnInit(){
    if(this.toggle){
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','white');
      this.renderer.setStyle(this.elementRef.nativeElement, 'border-color','red');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color','red');
      this.renderer.setStyle(this.elementRef.nativeElement, 'width','100px');
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML','UnFollow');
    }else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','blue');
      this.renderer.setStyle(this.elementRef.nativeElement, 'border-color','blue');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color','white');
      this.renderer.setStyle(this.elementRef.nativeElement, 'width','100px');
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML','Follow');
    } 
  }

  @HostListener('click') doFollow(eventData: Event) {
    this.toggle = !this.toggle;
    if(this.toggle){
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','white');
      this.renderer.setStyle(this.elementRef.nativeElement, 'border-color','red');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color','red');
      this.renderer.setStyle(this.elementRef.nativeElement, 'width','100px');
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML','UnFollow');
    }else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','blue');
      this.renderer.setStyle(this.elementRef.nativeElement, 'border-color','blue');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color','white');
      this.renderer.setStyle(this.elementRef.nativeElement, 'width','100px');
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML','Follow');
    }
  }

 

}
