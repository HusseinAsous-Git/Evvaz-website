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
  constructor(private router:Router, private activatedRoute: ActivatedRoute) { }

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


  }
  goViewBySchool(){

    this.router.navigate(['/admin','tenders','school'])

  }
}
