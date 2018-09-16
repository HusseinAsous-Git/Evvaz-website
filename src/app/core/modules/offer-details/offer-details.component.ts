import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { GetCompaniesService } from '../../services/get-companies/get-companies.service';
@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  company_id: Number;
  offer_id: Number;
  company: Object;
  offer_details: Object;
  UserData: Object;
  result: Object;
  request_details = {
    "requsted_school_id": Number,
    "requsted_offer_id": Number,
    "is_accepted": 0,
    "request_offer_count": 0
  }
  req_view_add={
    "seen_offer_id":0,
    "seen_offer_school_id":''
  };
  showSucces = false;
  showFail = false;
  timeLinePrecent: Number;
  daysLeft: Number;
  hoursLeft:Number;
  minutesLeft:Number;
  isClosed = false;
  today = new Date();
  constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfileService, private Company: GetCompaniesService) {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      this.company_id = params['company_id'];
      this.offer_id = +params['offer_id'];
    });
    
  }

  ngOnInit() {
    let user = localStorage.getItem('@MYUSER');
    this.UserData = JSON.parse(user);
    this.req_view_add['seen_offer_school_id']=this.UserData['login_id'];
    this.req_view_add['seen_offer_id']=+this.offer_id;
    this.addView();
    console.log("this user id is ====> ", this.UserData['login_id']);

    this.Company.getCompany(this.company_id).subscribe(
      (Company) => {
        this.company = Company;
      },
      (error) => {
        console.log('errors ', error)
      }
    );
    this.profileService.getOfferDetails(this.offer_id).subscribe(
      (response) => {
        if (response['status'] == 200) {
          let timeBase = response['model']['offer_expired_date'] - response['model']['offer_display_date'];
          let percent = +this.today - response['model']['offer_display_date'];
          this.timeLinePrecent = Math.floor((percent / timeBase) * 100);
          this.offer_details = response['model'];

          if (this.timeLinePrecent >= 100) {
            this.timeLinePrecent = 100;
            this.daysLeft = 0;
            this.hoursLeft =0;
            this.minutesLeft = 0;
            this.isClosed = true;

          }
          else {
            let delta = Math.abs(response['model']['offer_expired_date'] - +this.today) / 1000;
            let days = Math.floor(delta / 86400);
            delta -= days * 86400;
            let hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            let minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            this.daysLeft = days;
            this.hoursLeft =hours;
            this.minutesLeft = minutes;
            if(this.timeLinePrecent<=0){
              this.timeLinePrecent=0;
            }
          }
        }
        //console.log(response) ;
      }
      ,
      (error) => {
        console.log('errors ', error)
      }
    );
  }

  requestOffer() {
    this.request_details['requsted_school_id'] = this.UserData['login_id'];
    this.request_details['requsted_offer_id'] = this.offer_details['offer_id'];
    //this.request_details['request_offer_count']=this.offer_details['offer_count'];

    this.profileService.requestOffer(this.request_details).subscribe(
      (response) => {
        if (response['requsted_school_id']) {
          this.result = response;
          this.showSucces = true;
          this.showFail = false;
          //console.log(this.result);
        }
        else {
          this.showSucces = false;
          this.showFail = true;
        }

      }
      ,
      (error) => {
        this.showSucces = false;
        this.showFail = true;
        console.log('errors ', error)
      }
    );
    this.request_details['request_offer_count']=0;
  }
  addView(){
    this.profileService.addView(this.req_view_add).subscribe(
      (response) => {
        if(response['state']==400 || response['state']==500){
          console.log("view didn't count : " , response);
        }
        else if (response['message'] == "Already Exist"){
          console.log("view didn't count : " , response['message']);
        }
        else {
          console.log("view added : " , response);
        }
      },
      (error) => {
        console.log('errors ', error)
      }
    );
  }

}
