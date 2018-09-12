import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
 private UserData;
 private username;
  constructor() { 
    window.scrollTo(0, 0);
    let user = localStorage.getItem('@MYUSER');
    this.UserData = JSON.parse(user);
    this.username=this.UserData['']
  }

  ngOnInit() {
  }

}
