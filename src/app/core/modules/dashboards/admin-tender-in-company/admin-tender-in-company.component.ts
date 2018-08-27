import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-tender-in-company',
  templateUrl: './admin-tender-in-company.component.html',
  styleUrls: ['./admin-tender-in-company.component.scss']
})
export class AdminTenderInCompanyComponent implements OnInit {
date:Date;
  constructor(private router:Router) { }

  ngOnInit() {
    this.date = new Date();
  }
  goViewBySchool(){

    this.router.navigate(['/admin','tenders','school'])

  }
}
