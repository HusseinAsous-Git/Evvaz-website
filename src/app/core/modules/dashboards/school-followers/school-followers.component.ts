import { CompanyService } from '../../../services/company.service';

import { Component, OnInit } from '@angular/core';
import { SchollFollowerModel } from '../../../models/shool.follower.model';
import { SchoolService } from '../../../services/school.service';
import { CompanyModel } from '../../../models/company.model';

@Component({
  selector: 'app-school-followers',
  templateUrl: './school-followers.component.html',
  styleUrls: ['./school-followers.component.css']
})
export class SchoolFollowersComponent implements OnInit {
  loginId: number;
  currentUser;
  private allCompanies : CompanyModel [];
  private hashLogo : string;
  isFollowing = false;
  constructor(private schoolservice: SchoolService, private companyService: CompanyService) { }
  count = 0;
  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    console.log("Login Id: "+ this.loginId)
    this.schoolservice.getAllCompanies(this.loginId).subscribe(
      response => {
        this.allCompanies = response;
        for(let company of this.allCompanies) {
          this.count ++;
          company.company_logo_image = 'data:image/png;base64,' + company.company_logo_image;
        }
        console.log(response)
      }
    )



  }

  onFollow(companyId: number, followed : boolean){
    
    console.log("id is: " + companyId)
    this.isFollowing= !this.isFollowing
    followed = ! followed
    if(this.isFollowing&&followed){
      let  data = {
        organization_id:companyId,
        follower_id:this.loginId
      }
      this.companyService.follow(data).subscribe(
        response => {
          console.log("Successfully followed");
          console.log(response)
        },
        err => console.log(err)
      )
    }else {
      // delete follow here
      let data = {
        orgId:companyId,
        followerId:this.loginId
      }
      this.companyService.removeFollow(data).subscribe(
        response => {
          console.log("Successfully deleted");
          console.log(response)
        },
        err => console.log(err)
      )
    }
    
    
  }

}
