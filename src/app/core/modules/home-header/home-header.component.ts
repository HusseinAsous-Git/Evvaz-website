import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.less']
})
export class HomeHeaderComponent implements OnInit {
  UserData;
  isAdmin = false;
  isSchool = false;
  isCompany = false;

  constructor(private router: Router, private authService: AuthService) {
    let user;
    if (user = localStorage.getItem('@MYUSER')) {
      this.UserData = JSON.parse(user);
      if (this.UserData['login_role'] == 'admin') {
        this.isAdmin = true;
        this.isCompany = false;
        this.isSchool = false;
      }
      else if (this.UserData['login_role'] == 'company') {
        this.isCompany = true;
        this.isAdmin = false;
        this.isSchool = false;
      }
      else if (this.UserData['login_role'] == 'school') {
        this.isSchool = true;
        this.isCompany = false;
        this.isAdmin = false;
      }
    }


  }
  logout(): void {
    let x = this.authService.logout();

    console.log("This is ==>> " + x);
  }
  ngOnInit() {
  }

}
