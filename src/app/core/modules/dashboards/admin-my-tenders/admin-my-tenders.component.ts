import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-my-tenders',
  templateUrl: './admin-my-tenders.component.html',
  styleUrls: ['./admin-my-tenders.component.scss']
})
export class AdminMyTendersComponent implements OnInit {
  date: Date;
  tender:any;
  tenderId: number;
  tenders:any;
  companies:any = [];
  showCard: boolean = true;
  progressPercentage;
  progressStatus;
  constructor(private adminService:AdminService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.date = new Date();
    this.activatedRoute.params.subscribe(
      (params:Params) => {
        this.tenderId = +params['tenderId'];
        console.log("Tender id:" + this.tenderId)
      }
    )
    this.adminService.getTenderDetailsInCompany(this.tenderId).subscribe(
      response => {
        console.log(response);
        this.tenders = response;
        this.tender = response[0];
        console.log("Tender is:")
        console.log(this.tender)

        console.log("Display date:" + this.tender.tender_company_display_date)






        var percentage = this.tender.tender_company_expired_date - this.tender.tender_company_display_date;

        console.log("Percentage: " + percentage)
        var diff = this.tender.tender_company_expired_date - new Date().getTime();
        var division = diff / percentage;
        console.log("Division: " + division)
        this.progressPercentage = 100 - (Math.floor( division * 100));  
        this.progressStatus = "Available";
        console.log("Progress:"+ this.progressPercentage)
        if(this.tender.tender_company_display_date > Date.now()) {
            this.progressPercentage = 0 ;
            this.progressStatus = "Postponed";
            
          }else{
            if (division <0 || this.progressPercentage<0){
              this.progressPercentage = 100 ;
              this.progressStatus = "Expired";
            }
          }


        // var percentage = this.tenderData.data['tender_expire_date'] - this.tenderData.data['tender_display_date'];
        // var diff = this.tenderData.data['tender_expire_date'] - new Date().getTime();
        // var division = diff / percentage;
        // this.progressPercentage = 100 - (Math.floor( division * 100));
        // this.progressStatus = "Available";
        // console.log("Progress:"+ this.progressPercentage)
        // if(this.tenderData.data['tender_display_date'] > Date.now()) {
        //     this.progressPercentage = 0 ;
        //     this.progressStatus = "Postponed";
            
        //   }else{
        //     if (division <0 || this.progressPercentage<0){
        //       this.progressPercentage = 100 ;
        //       this.progressStatus = "Expired";
        //     }
        //   }

        // console.log("Difference between two dates: " + this.progressPercentage )


        console.log("Difference between two dates: " + this.progressPercentage )



      }
    )
    this.adminService.getAllCompaniesInTender(this.tenderId).subscribe(
      response => {
        console.log(response);
        this.companies = response;
        for(let c of this.companies) {
          c.company_logo_image = 'data:image/png;base64,' +  c.company_logo_image;
        }
      }
    )
  }




  agree(companyId: number,index:number) {
    this.adminService.agreeForCompany(companyId,this.tenderId).subscribe(
      response => {
        console.log(response);
        this.showCard = false;
        this.companies.splice(index,1);
        setTimeout(() => {
          this.showCard = true;
        },2000)
      }
    )
  }


}
