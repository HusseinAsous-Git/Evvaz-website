import { SchoolService } from './../../../services/school.service';
import { Component, OnInit } from '@angular/core';
import { SchoolProfileModel } from '../../../models/school.profile.model';

@Component({
  selector: 'app-school-home',
  templateUrl: './school-home.component.html',
  styleUrls: ['./school-home.component.css']
})
export class SchoolHomeComponent implements OnInit {
  activeProfile: SchoolProfileModel;
  loginId: number;
  currentUser;
  constructor(private schoolService:SchoolService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    
    this.schoolService.getProfile(this.loginId).subscribe(
      (response) => { 
        console.log(response);
        this.activeProfile = response;
        this.activeProfile.school_logo_image =  'data:image/png;base64,' + this.activeProfile.school_logo_image;
        this.activeProfile.school_cover_image =  'data:image/png;base64,' + this.activeProfile.school_cover_image;
       }
    )
}

}
