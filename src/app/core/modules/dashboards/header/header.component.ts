import { AuthService } from './../../../services/auth.service';
import { ProfileServiceDashboard } from './../../../services/profile.service.dashboard';

import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '../../../../../../node_modules/@angular/compiler/src/output/output_ast';
import { Router } from '../../../../../../node_modules/@angular/router';
import { UIService } from '../../../services/ui.service';

@Component({
  selector: 'app-header-dash',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderDashboardComponent implements OnInit {
  name: string;
  currentUser;
  loginId : number;
  constructor(private profileService: ProfileServiceDashboard,
     private authService: AuthService,
      private router:Router,
       private uiservice: UIService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    this.profileService.getProfile(this.loginId).subscribe(
      response => {
        console.log(response);
        this.name = response.company_name;
      }
    )
  }

  toggleSidebar(){
    if(!this.uiservice.getSidebarStatus()){
      this.uiservice.sidebarStatus = true ; 
    }
    console.log("toggled")
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/']);

  }

}
