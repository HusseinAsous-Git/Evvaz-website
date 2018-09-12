import { SchoolSingleTender } from './../../../models/school.single.tender.model';
import { TenderModel } from './../../../models/tender.model';

import { ActivatedRoute, Router, Params, Data } from '@angular/router';
import { SchoolService } from './../../../services/school.service';
import { Component, OnInit } from '@angular/core';
import { CompanyOfferResponse } from '../../../models/company.offer.response.model';

@Component({
  selector: 'app-view-tender',
  templateUrl: './view-tender.component.html',
  styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent implements OnInit {
date: Date;

tenderId: number;
tender: SchoolSingleTender;
companies: CompanyOfferResponse [];
srcLogo: string;
showCard: boolean = true;
progressPercentage;
progressStatus;
agreeFlag = true;
  constructor(private schoolService: SchoolService, private activatedRoute:ActivatedRoute, private router:Router) { }

  toggle = false;
  ngOnInit() {
    this.date = new Date();

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tenderId = +params['tenderId'];
        console.log("Tender id: " + this.tenderId)
      }
    );
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.tender = data['tender'];
        this.companies = this.tender.companies;
        console.log(this.tender)
        if(this.companies){

        
        for (let c of this.companies){
        c.company_logo_image = 'data:image/png;base64,' + c.company_logo_image;
       
      }
    }
    
    var percentage = this.tender.tender.request_expired_date - this.tender.tender.request_display_date;

    console.log("Percentage: " + percentage)
    var diff = this.tender.tender.request_expired_date - new Date().getTime();
    var division = diff / percentage;
    console.log("Division: " + division)
    this.progressPercentage = 100 - (Math.floor( division * 100));  
    console.log("Progress:"+ this.progressPercentage)
    this.progressStatus = "Available";
    if(this.tender.tender.request_display_date > Date.now()) {
      this.progressPercentage = 0 ;
      this.progressStatus = "Postponed";
      
    }else{
      if (division <0 || this.progressPercentage<0){
        this.progressPercentage = 100 ;
        this.progressStatus = "Expired";
      }
    }

    console.log("Difference between two dates: " + this.progressPercentage )

    }
    );


   

    // this.schoolService.getSingleTender(9).subscribe(
    //   response =>{
    //     console.log(response);
    //     this.tender = response['tender'];
    //     console.log(this.tender);
    //     console.log(response['companies'])
    //   } 
    //   )
    


  }


  agree(id: number, flag:boolean){
    
    
    if(this.agreeFlag){
      this.schoolService.agreeToCompany(id).subscribe(
        response=>{ 
          console.log(response);
        },err => console.log(err)
      );
      this.agreeFlag =!this.agreeFlag;
    }else {
      this.schoolService.refuseToCompany(id).subscribe(
        response=>{ 
          console.log(response);
          flag =!flag;
        },err => console.log(err)
      );
      this.agreeFlag =!this.agreeFlag;  
    }
    
      
    
      
  }





}
