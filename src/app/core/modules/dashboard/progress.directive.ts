import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appProgress]'
})
export class ProgressDirective {

  @HostBinding('style.width') width: string;
  
  constructor() { }

}
