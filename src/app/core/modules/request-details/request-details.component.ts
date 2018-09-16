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
  daysLeft:Number;
  requestDetails:SchoolRequest;
  timeLinePrecent:Number;
  showSucces=false;
  showFail=false;
  isClosed=false;
  cost='0';
  service_details={
    "responsed_company_id":0,
	  "responsed_request_id":0,
    "responsed_cost":0
  }
  constructor(private route: ActivatedRoute, private router: Router,private http: Http, private purchasPlatform: PurchasePlatformService) { 
    window.scrollTo(0, 0);
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
          if(this.timeLinePrecent>=100){
            this.timeLinePrecent=100;
            this.daysLeft=0;
            this.isClosed=true;
            
          }
          else{
            let delta = Math.abs(response['request_expired_date'] - +this.today) / 1000;
            let days = Math.floor(delta / 86400);
            this.daysLeft=days;
            if(this.timeLinePrecent<=0){
              this.timeLinePrecent=0;
            }
            
          }
        }
        
      },
      (error) => {
        console.log('errors ', error)
      }
    );
  }
  addView(){
    this.purchasPlatform.addView(this.req_view_add).subscribe(
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

  offerYourService(){
    //this.service_details['responsed_cost']=+this.cost;
    this.service_details.responsed_company_id=this.UserData['login_id'];
    this.service_details.responsed_request_id= +this.request_id;
    //this.service_details.responsed_cost= +this.cost;
    //console.log("request === > " ,this.service_details);
    this.purchasPlatform.offerService(this.service_details).subscribe(
      (response) =>{
        if(response['responsed_company_id']){
          this.showSucces=true;
          this.showFail=false;
          //console.log("response === > " ,response);
        }
        else{
          this.showSucces=false;
          this.showFail=true;
        }
      },
      (error) => {
        this.showSucces=false;
        this.showFail=true;
        console.log('errors ', error)
      }
    );
    this.service_details['responsed_cost']=0;
  }
}
