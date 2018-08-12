import { GetCompaniesService } from './../../../services/get-companies/get-companies.service';
import { environment } from './../../../../../environments/environment.prod';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
/*model*/
import { CompaniesInfo } from './../../../models/companies-info';

@Component({
  selector: 'app-offer-platform',
  templateUrl: './offer-platform.component.html',
  styleUrls: ['./offer-platform.component.scss']
})
export class OfferPlatformComponent implements OnInit {
  companiesInfo: Object;
  constructor(private http: Http, private Companies: GetCompaniesService) { }
  // get all companies
  
  ngOnInit(): void {
      this.Companies.getAllCompanies().subscribe(
        (Companies) => {
          this.companiesInfo =Companies;  
          console.log(this.companiesInfo);     
        },
        (error) => {
          console.log('errors ', error)
        }
      );
      
    }
}


