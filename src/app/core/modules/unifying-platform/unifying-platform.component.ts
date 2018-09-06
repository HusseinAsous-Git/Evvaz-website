import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unifying-platform',
  templateUrl: './unifying-platform.component.html',
  styleUrls: ['./unifying-platform.component.scss']
})
export class UnifyingPlatformComponent implements OnInit {
  islogged=false;
  constructor() { window.scrollTo(0, 0);}

  ngOnInit() {
    if(localStorage.getItem('@MYUSER')){
      this.islogged=true;
    }
    
  }

}
