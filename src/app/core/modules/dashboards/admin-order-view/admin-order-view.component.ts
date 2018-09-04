import { SchoolService } from './../../../services/school.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';

import { ProfileServiceDashboard } from '../../../services/profile.service.dashboard';

@Component({
  selector: 'app-admin-order-view',
  templateUrl: './admin-order-view.component.html',
  styleUrls: ['./admin-order-view.component.scss']
})
export class AdminOrderViewComponent implements OnInit {
date:Date;
offerId: number;
offer;
unitPrice;
companyProfile;
schoolProfile;
loading= true;
  constructor(private adminService: AdminService,
     private activatedRoute:ActivatedRoute, 
     private profileService:ProfileServiceDashboard,
     private schoolService:SchoolService) { }

  ngOnInit() {
    this.date = new Date();
    this.activatedRoute.params.subscribe(
      (params:Params) => {
        this.offerId = +params['orderId'];
      }
    )
    this.adminService.getOrderByOfferId(this.offerId).subscribe(
      (response) => {
        console.log(response);
        this.offer = response;
        this.offer.offer_image = 'data:image/png;base64,' + this.offer.offer_image;
        this.unitPrice = this.offer.offer_cost / this.offer.request_offer_count;

        // here i get company profile
        this.profileService.getProfile(this.offer.company_id).subscribe(
          
          (response) => { 
            this.loading = false;
            this.companyProfile = response;
            console.log(response)
             this.companyProfile.company_logo_image = 'data:image/png;base64,' + this.companyProfile.company_logo_image;     
          }
        );

        // here i get school profile
        this.schoolService.getProfile(this.offer.school_id).subscribe(
          (response) => {
            console.log(response);
            this.schoolProfile = response;
            this.schoolProfile.school_logo_image =  'data:image/png;base64,' + this.schoolProfile.school_logo_image;
          }
        )
      }
    )
  }

}
