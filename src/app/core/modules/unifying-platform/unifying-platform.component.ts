import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unifying-platform',
  templateUrl: './unifying-platform.component.html',
  styleUrls: ['./unifying-platform.component.scss']
})
export class UnifyingPlatformComponent implements OnInit {
  islogged=false;
  isCompany=false;
  UserData;
  constructor() { window.scrollTo(0, 0);}

  ngOnInit() {
    let user;
    if(user = localStorage.getItem('@MYUSER')){
      this.islogged=true;

      this.UserData=JSON.parse(user);
      if(this.UserData['login_role'] =="company"){
        this.isCompany=true;
      }
    }
    
  }

}
