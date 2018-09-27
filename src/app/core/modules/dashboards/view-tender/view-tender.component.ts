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
companiesCount=0;
agreeArray : boolean [] = [];
disableArray : boolean [] = []; 
chosen = false;
chosenId = -1;
currentResponseId;
currentIsApproved;
currentIndex;
toggleFlag;
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
       this.companiesCount ++;
       this.agreeArray.push(false);
       this.disableArray.push(true);
       if(c['is_aproved'] == 1) {
         this.chosen = true;
         this.chosenId = c['response_id'];
       }
      }
    }
    console.log("CompanyCount: " + this.companiesCount)
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

  showPopup(responseId, isAprroved, index) {
    this.currentIndex = index;
    this.currentIsApproved = isAprroved;
    this.currentResponseId = responseId;
     document.getElementById("openModalButton").click();
  }

  agree(){
console.log("Response ID:")
console.log(this.currentResponseId)
    this.currentIsApproved = true;
    // if(!this.agreeArray[this.currentIndex] && !this.currentIsApproved){
      this.schoolService.agreeToCompany(this.currentResponseId).subscribe(
        response=>{ 
          console.log(response);
          location.reload();
        },err => console.log(err)
      );

      // this.agreeArray[this.currentIndex] = !this.agreeArray[this.currentIndex];
      // location.reload();
     
     // flag = !flag;

    // }else {
    //   this.schoolService.refuseToCompany(this.currentResponseId).subscribe(
    //     response=>{ 
    //       console.log(response);
         
    //     },err => console.log(err)
        
    //   );
    //   this.agreeArray[this.currentIndex] = !this.agreeArray[this.currentIndex];
    //   location.reload();
    //  // flag = !flag;
    // }
    
    
    
      
  }





}
