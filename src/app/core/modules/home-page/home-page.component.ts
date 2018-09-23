import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
 private UserData;
 public orgname;
  constructor() { 
    window.scrollTo(0, 0);
    let user = localStorage.getItem('@MYUSER');
    this.UserData = JSON.parse(user);
    this.orgname=this.UserData['org_name']
  }

  ngOnInit() {
  }

}
