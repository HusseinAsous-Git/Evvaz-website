import { AuthService } from './../../../services/auth.service';
import { AdminService } from './../../../services/admin.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent implements OnInit {
date:Date;
history:any;
loginId:number;
currentUser;
token : string;
count=0;
  constructor(private router:Router, private adminService:AdminService, private authService:AuthService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    this.token = this.authService.getToken()
    console.log("token is: " + this.token)
    this.date = new Date();

    
    this.adminService.getAllHistory().subscribe(
      response => {
        console.log(response);
        this.history = response;
        for(let h of this.history){
          this.count++;
          h.company_logo_image =  'data:image/png;base64,' +h.company_logo_image;
          h.school_logo_image = 'data:image/png;base64,' +  h.school_logo_image;
        }
      }
    )
  }


  
  linkNavHistory(orderId: number){
    this.router.navigate(['/admin','history',orderId,'view'])
  }

}
