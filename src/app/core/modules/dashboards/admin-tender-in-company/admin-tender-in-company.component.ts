import { AdminTenderCategoriesModel } from './../../../models/admin.tender.cayegories.model';
import { AdminRequestTenderModel } from './../../../models/admin.request.tender.model';
import { AdminService } from './../../../services/admin.service';
import { AdminTenderResolverModel } from './../../../models/admin.tender.resolve.model';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-tender-in-company',
  templateUrl: './admin-tender-in-company.component.html',
  styleUrls: ['./admin-tender-in-company.component.scss']
})
export class AdminTenderInCompanyComponent implements OnInit {
date:Date;
tenderId: number;
tender: AdminTenderResolverModel ;
cats ;
tenderRequest:any ;
tenderCategories: any;
tenderData:any;
progressPercentage=0;
progressStatus;
catExist = false;
  constructor(private router:Router, private activatedRoute: ActivatedRoute, private adminService:AdminService) { }

  ngOnInit() {
    this.date = new Date();

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tenderId = +params['tenderId'];
        console.log("Tender id: " + this.tenderId)
      }
    );

    this.adminService.getTenderById(this.tenderId).subscribe(
      response => {
        console.log("This is Tender request:");
        console.log(response);
        this.tenderRequest = response;
        this.tenderId = this.tenderRequest['tender_id'];
        if(this.tenderRequest.schools[0]) {
          this.catExist = true;
        }
        


        var percentage = this.tenderRequest['tender_expire_date'] - this.tenderRequest['tender_display_date'];
        var diff = this.tenderRequest['tender_expire_date'] - new Date().getTime();
        var division = diff / percentage;
        this.progressPercentage = 100 - (Math.floor( division * 100));
        this.progressStatus = "Available";
        console.log("Progress:"+ this.progressPercentage)
        if(this.tenderRequest['tender_display_date'] > Date.now()) {
            this.progressPercentage = 0 ;
            this.progressStatus = "Postponed";
            
          }else{
            if (division <0 || this.progressPercentage<0){
              this.progressPercentage = 100 ;
              this.progressStatus = "Expired";
            }
          }

        console.log("Difference between two dates: " + this.progressPercentage )







        for(let s of this.tenderRequest.schools){
          s.school_logo_image = 'data:image/png;base64,' + s.school_logo_image;
        }

      }
    )


    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.tender = data['tender'];
        console.log(this.tender)
      //   for (let c of this.companies){
      //   c.company_logo_image = 'data:image/png;base64,' + c.company_logo_image;
       
      // }

      
     

this.cats = this.tender.categories;
      for(let c of this.tender.categories){
        c.school_logo_image = 'data:image/png;base64,' + c.school_logo_image;
      }


    }

    
    


    );

    


    this.adminService.getTenderCategories(this.tenderId).subscribe(
      response => {
        console.log("This is Tender categories:")
        console.log(response)
        this.tenderData = response;

        
    // var percentage = this.tender.tender.request_expired_date - this.tender.tender.request_display_date;

    // console.log("Percentage: " + percentage)
    // var diff = this.tender.tender.request_expired_date - new Date().getTime();
    // var division = diff / percentage;
    // console.log("Division: " + division)
    // this.progressPercentage = 100 - (Math.floor( division * 100));  
    // console.log("Progress:"+ this.progressPercentage)
    // this.progressStatus = "Available";
    // if(this.tender.tender.request_display_date > Date.now()) {
    //   this.progressPercentage = 0 ;
    //   this.progressStatus = "Postponed";
      
    // }else{
    //   if (division <0 || this.progressPercentage<0){
    //     this.progressPercentage = 100 ;
    //     this.progressStatus = "Expired";
    //   }
    // }

    // console.log("Difference between two dates: " + this.progressPercentage



      }
    )

  }
  goViewBySchool(tenderId: number){

    this.router.navigate(['/admin','tenders',tenderId,'school'])

  }


deleteTender(tenderId : number) {

  if(confirm("Are you sure to delete This tender?")) {
    this.adminService.deleteTender(tenderId).subscribe(
      response => {
        console.log(response);
        console.log("Successfully deleted!");
        this.router.navigate(['/admin','tenders','mine'])
      }
    )
  }


  
}


}
