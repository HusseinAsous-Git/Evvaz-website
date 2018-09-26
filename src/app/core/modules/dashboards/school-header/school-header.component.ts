import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UIService } from '../../../services/ui.service';

import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-school-header',
  templateUrl: './school-header.component.html',
  styleUrls: ['./school-header.component.css']
})
export class SchoolHeaderComponent implements OnInit {
loginId: number;
currentUser;
  constructor(private schoolService: SchoolService, private uiService:UIService, private authService: AuthService, private router:Router) { }
name : string;
  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];

    this.schoolService.getProfile(this.loginId).subscribe(
      response => {
       this.name =  response.school_name;
      }
    )
  }

  toggleSidebar(){
    
      this.uiService.sidebarStatus = !this.uiService.sidebarStatus ; 
    
//    console.log("toggled")
  }


  onLogout(){
    this.authService.logout();
    this.router.navigate(['/']);

  }
}
