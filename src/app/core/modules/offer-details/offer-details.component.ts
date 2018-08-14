import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from '../../services/profile/profile.service';
import { GetCompaniesService } from '../../services/get-companies/get-companies.service';
@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  company_id:Number;
  offer_id:Number;
  company:Object;
  offer_details:Object;
  UserData:Object;
  result:Object;
  request_details ={
      "requsted_school_id":Number, 
      "requsted_offer_id":Number, 
      "is_accepted":1,
      "request_offer_count":Number
  }
  constructor(private route: ActivatedRoute, private router: Router, private profileService : ProfileService ,private Company: GetCompaniesService) {
    this.route.params.subscribe(params => {
      this.company_id = params['company_id'];
      this.offer_id = params['offer_id'];
    });
   }

  ngOnInit() {
    let user = localStorage.getItem('@MYUSER');
    this.UserData = JSON.parse(user);
    console.log("this user id is ====> ",this.UserData['login_id']);

    this.Company.getCompany(this.company_id).subscribe(
      (Company) => {
        this.company =Company;  
      },
      (error) => {
        console.log('errors ', error)
      }
    );
    this.profileService.getOfferDetails(this.offer_id).subscribe(
      (response) => {
        if(response['status']==200){
          this.offer_details=response['model'];  
        }
        //console.log(response) ;
      }
      // ,
      // (error) => {
      //   console.log('errors ', error)
      // }
    );
  }

  requestOffer(){
    this.request_details['requsted_school_id']=this.UserData['login_id'];
    this.request_details['requsted_offer_id']=this.offer_details['offer_id'];
    this.request_details['request_offer_count']=this.offer_details['offer_count'];

    this.profileService.requestOffer(this.request_details).subscribe(
      (response) => {
        if(response['requsted_school_id']){
          this.result=response;
          //console.log(this.result);
        }
        
      }
    );
  }

}
