import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '../../../../../../node_modules/@angular/router';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-order-profile-school-cpy',
  templateUrl: './order-profile-school-cpy.component.html',
  styleUrls: ['./order-profile-school-cpy.component.scss']
})
export class OrderProfileSchoolCpyComponent implements OnInit {
  offerId: number;
  profileId: number;
  schoolProfile;
  isLoading = true;
  constructor(private activatedRoute:ActivatedRoute, private schoolService:SchoolService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.offerId = +params['orderId'];
        this.profileId = +params['profileId'];
        console.log("Profile id:" + this.profileId)
      }
    )


    this.schoolService.getProfile(this.profileId).subscribe(
      (response) => {
        console.log(response);
        this.schoolProfile = response;
        this.isLoading = false;
        this.schoolProfile.school_logo_image =  'data:image/png;base64,' + this.schoolProfile.school_logo_image;
      }
    )

  }

}
