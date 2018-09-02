import { SchoolRequest} from '../../models/school-category-request.model';
import { Component, OnInit } from '@angular/core';
import { PurchasePlatformService } from '../../services/purchase-platform/purchase-platform.service';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  request_id;
  today = new Date();
  UserData:Object;
  req_view_add={
    "request_company_id":'',
    "request_id":''
  };
  req_view_response={
    "request_company_id":'',
    "request_id":''
  };
  daysLeft:Number;
  requestDetails:SchoolRequest;
  timeLinePrecent:Number;
  constructor(private route: ActivatedRoute, private router: Router,private http: Http, private purchasPlatform: PurchasePlatformService) { 
    this.route.params.subscribe(params => {
      this.request_id = params['reqId'];
    });
    let user = localStorage.getItem('@MYUSER');
    this.UserData = JSON.parse(user);
    //console.log("this user id is ====> ",this.UserData['login_id'])
    this.req_view_add['request_company_id']=this.UserData['login_id'];
    this.req_view_add['request_id']=this.request_id;
    //console.log("request ====> ", this.req_view_add)
    
    
  }

  ngOnInit() {
    this.addView();

    this.purchasPlatform.getRequestDetails(this.request_id).subscribe(
      (response) => {
        if(response['request_id']){
          this.requestDetails=response;
          let timeBase = response['request_expired_date']-response['request_display_date'];
          let percent = +this.today-response['request_display_date'];
          this.timeLinePrecent=Math.floor((percent/timeBase)*100);
          if(this.timeLinePrecent>100){
            this.timeLinePrecent=100;
            this.daysLeft=0;
          }
          else{
            let delta = Math.abs(response['request_expired_date'] - +this.today) / 1000;
            let days = Math.floor(delta / 86400);
            this.daysLeft=days;
          }
        }
        
      },
      (error) => {
        console.log('errors ', error)
      }
    );
  }
  addView(){
    //if(this.UserData)
    this.purchasPlatform.addView(this.req_view_add).subscribe(
      (response) => {
        if(response['state']==400){
          //console.log("view didn't count : " , response);
        }
        else {
          //console.log("view added : " , response);
        }
      },
      (error) => {
        console.log('errors ', error)
      }
    );
  }
}
