import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '../../../../../../node_modules/@angular/router';
import { ProfileServiceDashboard } from '../../../services/profile.service.dashboard';

@Component({
  selector: 'app-order-profile-company-cpy',
  templateUrl: './order-profile-company-cpy.component.html',
  styleUrls: ['./order-profile-company-cpy.component.scss']
})
export class OrderProfileCompanyCpyComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private profileService:ProfileServiceDashboard) { }
  offerId: number;
  profileId:number;
  isLoading=true;
  companyProfile;
  cats;
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.offerId = +params['orderId'];
        this.profileId = +params['profileId'];
        console.log("Profile id:" + this.profileId)
      }
    )
    this.profileService.getProfile(this.profileId).subscribe(
      (response) => { 
        this.companyProfile = response;
        this.isLoading = false;
        console.log(response)
        this.cats = this.companyProfile.category;
        console.log(this.cats)
         this.companyProfile.company_logo_image = 'data:image/png;base64,' + this.companyProfile.company_logo_image;     
      }
    );


  }

}
