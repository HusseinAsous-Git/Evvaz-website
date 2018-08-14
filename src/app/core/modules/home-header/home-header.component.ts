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

  constructor(private router: Router,private authService: AuthService) { }
  logout():void{
    let x=this.authService.logout();
    
    console.log("This is ==>> "+x);
  }
  ngOnInit() {
  }

}
