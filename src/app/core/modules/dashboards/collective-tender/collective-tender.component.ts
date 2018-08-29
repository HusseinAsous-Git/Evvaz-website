import { SchoolTenderResolverModel } from './../../../models/school.tender.resolver.model';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collective-tender',
  templateUrl: './collective-tender.component.html',
  styleUrls: ['./collective-tender.component.scss']
})
export class CollectiveTenderComponent implements OnInit {
date:Date;
tenderId: number;
tender:SchoolTenderResolverModel ;
  constructor(private activatedRoute:ActivatedRoute, private router:Router) { }

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
        
    }
    );


    
  }

}
