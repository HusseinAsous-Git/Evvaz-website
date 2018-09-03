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
  companies:any;
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
        this.tender = response[1];
        console.log(this.tender)
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




  agree(companyId: number) {
    this.adminService.agreeForCompany(companyId,this.tenderId).subscribe(
      response => {
        console.log(response);
        
      }
    )
  }


}
