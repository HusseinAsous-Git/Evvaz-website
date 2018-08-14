
import { Component, OnInit } from '@angular/core';
import { SchollFollowerModel } from '../../../models/shool.follower.model';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-school-followers',
  templateUrl: './school-followers.component.html',
  styleUrls: ['./school-followers.component.css']
})
export class SchoolFollowersComponent implements OnInit {
  loginId: number;
  currentUser;
  private schollFollowers : SchollFollowerModel [];
  private hashLogo : string;
  constructor(private schoolservice: SchoolService) { }
  count = 0;
  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    this.schoolservice.getFollowers(this.loginId).subscribe(
      response => {
        this.schollFollowers = response;
        for(let follower of this.schollFollowers) {
          this.count ++;
          follower.company_logo_image = 'data:image/png;base64,' + follower.company_logo_image;
        }
        console.log(response)
      }
    )
  }

}
