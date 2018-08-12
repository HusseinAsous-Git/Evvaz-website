

import { Component, OnInit } from '@angular/core';
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
  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.schoolService.getSchools(3).subscribe(
      response => {
        console.log(response);
        this.schools = response;
       
        for(let school of this.schools) {
          school.school_logo_image = 'data:image/png;base64,' +  school.school_logo_image;
          this.followerNumber ++;
        }
        
        console.log(this.schools);
      }
    )
  }

}
