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
        for (let c of this.companies){
        c.company_logo_image = 'data:image/png;base64,' + c.company_logo_image;
       
      }
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


  agree(){
      this.toggle = true;
  }





}
