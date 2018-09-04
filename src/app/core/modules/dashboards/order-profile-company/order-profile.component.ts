import { Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfileServiceDashboard } from '../../../services/profile.service.dashboard';

@Component({
  selector: 'app-order-profile',
  templateUrl: './order-profile.component.html',
  styleUrls: ['./order-profile.component.scss']
})
export class OrderProfileComponent implements OnInit {

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
