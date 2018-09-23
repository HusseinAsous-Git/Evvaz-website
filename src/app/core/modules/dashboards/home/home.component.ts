import { AdminService } from './../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';
import { ProfileServiceDashboard } from '../../../services/profile.service.dashboard';
import { CompanyProfileModel } from '../../../models/company.profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated = false;
  loginId: number;
  currentUser;
  adminCategories;
  activeProfile:CompanyProfileModel;
  youtube = false;
  constructor(private authService: AuthService, private profileService: ProfileServiceDashboard, private adminService:AdminService) { }

  ngOnInit() {


    this.isAuthenticated =  this.authService.isAuthenticated();
    console.log("Authentication: " + this.isAuthenticated)

  this.currentUser =   localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
  console.log("User is: " + userData)

  this.profileService.getProfile(this.loginId).subscribe(
    (response) => { 
      console.log("Company profile:");  
      console.log(response);
      this.activeProfile = response;
      this.activeProfile.company_logo_image = 'data:image/png;base64,' + this.activeProfile.company_logo_image;
      if(this.activeProfile.company_link_youtube){
        this.youtube = true;
      }

    }
  )
  // this.adminService.getCategories().subscribe(
  //   response => {console.log(response);
  //     this.adminCategories = response; }

  // )

  }

}
