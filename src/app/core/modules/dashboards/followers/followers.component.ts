import { CompanyService } from '../../../services/company.service';


import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SchoolProfileModel } from '../../../models/school.profile.model';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  schools : SchoolProfileModel [] ;
  logo: string;
  followerNumber: number = 0;
  loginId : number;
  currentUser;
  isFollowing = false;
  constructor(private schoolService: SchoolService, private companyService:CompanyService) { }

  ngOnInit() {

    this.currentUser = localStorage.getItem("@MYUSER");
    let currentUserData = JSON.parse(this.currentUser);
    this.loginId = currentUserData['login_id'];

    this.schoolService.getSchools(this.loginId).subscribe(
      response => {
      //  console.log(response);
        this.schools = response;
       
        for(let school of this.schools) {
          school.school_logo_image = 'data:image/png;base64,' +  school.school_logo_image;
       //   console.log("School id: " + school.school_id)
          this.followerNumber ++;
        }
        
    //    console.log(this.schools);
      }
    )
  }

  onFollow(id: number, followed: boolean ){ 

    
   // console.log("id is: " + id)
    this.isFollowing= !this.isFollowing
    followed = ! followed
    if(this.isFollowing&&followed){
      let  data = {
        organization_id:id,
        follower_id:this.loginId
      }
      this.companyService.follow(data).subscribe(
        response => {
       //   console.log("Successfully followed");
        //  console.log(response)
        },
        err => console.log("ERROR IN followers COMPONENT")
      )
    }else {
      // delete follow here
      let data = {
        orgId:id,
        followerId:this.loginId
      }
      this.companyService.removeFollow(data).subscribe(
        response => {
       //   console.log("Successfully deleted");
       //   console.log(response)
        },
        err => console.log("ERROR IN followers COMPONENT")
      )
    }
    
    
   
     
  }

}
