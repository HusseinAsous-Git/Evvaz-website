import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ProfileServiceDashboard } from '../../../services/profile.service.dashboard';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-admin-history-view',
  templateUrl: './admin-history-view.component.html',
  styleUrls: ['./admin-history-view.component.scss']
})
export class AdminHistoryViewComponent implements OnInit {
  order;
  orderId:number;
  loading = true;
  companyProfile;
  schoolProfile;
  total:number = 0;
  constructor(private adminService:AdminService,
     private activatedRoute:ActivatedRoute,
      private profileService:ProfileServiceDashboard,
       private schoolService:SchoolService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params:Params) => {
        this.orderId = +params['orderId'];
        console.log("OrderId: "+ this.orderId)

        this.adminService.getHistoryOrder(this.orderId).subscribe(
          response => {
            console.log("History response:");
            console.log(response);
            this.order = response;
            this.order.company_logo_image = 'data:image/png;base64,'+this.order.company_logo_image;
            this.order.school_logo_image = 'data:image/png;base64,'+this.order.school_logo_image;
            this.order.offer_image = 'data:image/png;base64,'+this.order.offer_image;
            console.log("cost: " +this.order.loffer_cost + " is of type: "+ typeof(this.order.offer_cost) );
            console.log("Ship: " +this.order.ship + " is of type: "+ typeof(this.order.ship) );
            this.total = this.order.ship + this.order.offer_cost
            // here i get company profile
            this.profileService.getProfile(this.order.company_id).subscribe(
                      
              (response) => { 
                console.log("Company profile here:");
                this.loading = false;
                this.companyProfile = response;
                console.log(response)
                this.companyProfile.company_logo_image = 'data:image/png;base64,' + this.companyProfile.company_logo_image;     
              }
            );

            // here i get school profile
            this.schoolService.getProfile(this.order.school_id).subscribe(
              (response) => {
                console.log("School profile here:");
                console.log(response);
                this.schoolProfile = response;
                this.schoolProfile.school_logo_image =  'data:image/png;base64,' + this.schoolProfile.school_logo_image;
              }
            )


          },

          err => {
            console.log("ERROR:")
            console.log(err)
          }
        )
      }
    )


  }

}
