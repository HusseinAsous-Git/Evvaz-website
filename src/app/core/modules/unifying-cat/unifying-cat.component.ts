import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnifyingPlatformService } from '../../services/unifying-platform/unifying-platform.service';

@Component({
  selector: 'app-unifying-cat',
  templateUrl: './unifying-cat.component.html',
  styleUrls: ['./unifying-cat.component.scss']
})
export class UnifyingCatComponent implements OnInit {
  UserData;
  catId: Number;
  today = new Date();
  nToday = +this.today;
  req_view_add = {
    "seen_tender_id": 0,
    "seen_school_id": ''
  };
  daysLeft: Number;
  timeLinePrecent: Number;
  showSucces = false;
  showFail = false;
  isClosed = false;
  showForUser = false;
  tenderDetails: Object;
  constructor(private route: ActivatedRoute, private unifyingPlatform: UnifyingPlatformService) {
    window.scrollTo(0, 0);
    let user = localStorage.getItem('@MYUSER');
    this.UserData = JSON.parse(user);
    this.route.params.subscribe(params => {
      this.catId = +params['id'];
    });
    this.req_view_add['seen_school_id'] = this.UserData['login_id'];
  }

  ngOnInit() {
    this.unifyingPlatform.getUniCatData(this.catId).subscribe(
      (response) => {
        if (response[0]['tender_id']) {
          // activation
          // console.log("current_date : " ,+this.today);
          // console.log("tender_display_date : " ,+response[0]['tender_display_date']);
          // console.log("tender_expire_date : " ,+response[0]['tender_expire_date']);
          // console.log("tender_company_display_date : " ,+response[0]['tender_company_display_date']);
          // console.log("tender_expire_date : " ,+response[0]['tender_company_expired_date']);

          let school_start = +response[0]['tender_display_date'];
          let school_end = +response[0]['tender_expire_date'];
          let company_start = +response[0]['tender_company_display_date'];
          let company_end = +response[0]['tender_company_expired_date'];

          if (this.UserData['login_role'] == "admin") {
            this.showForUser = true;
          }
          else if (this.UserData['login_role'] == "school") {
            if (school_start < this.nToday && this.nToday < school_end) {
              this.showForUser = true;
            }
          }
          else if (this.UserData['login_role'] == "company") {
            // if(company_start<this.nToday && this.nToday< company_end){
            //   this.showForUser=true;
            // }
          }
          if (this.showForUser) {
            this.req_view_add['seen_tender_id'] = +response[0]['tender_id'];

            console.log('there is a tender');
            let timeBase = response[0]['tender_expire_date'] - response[0]['tender_display_date'];
            let percent = +this.today - response[0]['tender_display_date'];
            this.timeLinePrecent = Math.floor((percent / timeBase) * 100);
            if (this.timeLinePrecent >= 100) {
              this.timeLinePrecent = 100;
              this.daysLeft = 0;
              this.isClosed = true;

            }
            else {
              let delta = Math.abs(response[0]['tender_expire_date'] - +this.today) / 1000;
              let days = Math.floor(delta / 86400);
              this.daysLeft = days;
              if (this.timeLinePrecent <= 0) {
                this.timeLinePrecent = 1;
              }

            }
            this.tenderDetails = response[0];
            this.addView();
          }





        }
        else {
          console.log('there is something wrong in getting data');
        }
      },
      (error) => {
        console.log('errors ', error)
      }
    );
  }
  addView() {
    this.unifyingPlatform.addView(this.req_view_add).subscribe(
      (response) => {
        if (response['state'] == 400 || response['state'] == 500) {
          console.log("view didn't count : ", response);
        }
        else if (response['message'] == "Already Exist") {
          console.log("view didn't count : ", response['message']);
        }
        else {
          console.log("view added : ", response);
        }
      },
      (error) => {
        console.log('errors ', error)
      }
    );
  }

}
