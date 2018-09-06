import {SchoolRequest} from '../../models/school-category-request.model';
import {CategoryDetails} from '../../models/purchase-category-details.model';
import { PurchasePlatformService } from '../../services/purchase-platform/purchase-platform.service';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-category',
  templateUrl: './purchase-category.component.html',
  styleUrls: ['./purchase-category.component.scss']
})
export class PurchaseCategoryComponent implements OnInit {
  requests:SchoolRequest[];
  requestsView:SchoolRequest[];
  closedView:SchoolRequest[];
  today = new Date();
  formFilterChoice='descending';

  category_id:Number;
  categoryDetails:CategoryDetails;
  constructor(private route: ActivatedRoute, private router: Router,private http: Http, private purchasPlatform: PurchasePlatformService) { 
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      this.category_id = params['catId'];
    });
  }

  ngOnInit() {
    this.purchasPlatform.getCategoryRequests(this.category_id).subscribe(
      (response) => {
        this.requests =response;  
        for(var rquest of this.requests){
           if(rquest.request_expired_date - +this.today <=0){
             rquest.daysLeft=0
             rquest.open=false;
          }
          else{
            let delta = Math.abs(rquest.request_expired_date - +this.today) / 1000;
            let days = Math.floor(delta / 86400);
            rquest.daysLeft=days;
            //delta -= days * 86400;
            rquest.open=true;
          }
        }
        this.descendingSort();   
      },
      (error) => {
        console.log('errors ', error)
      }
    );
    

    this.purchasPlatform.getCategoryDetails(this.category_id).subscribe(
      (response) => {
        this.categoryDetails=response[0];
      },
      (error) => {
        console.log('errors ', error)
      }
    );
    
    
    
  }

 

  filterChoice(){
    switch(this.formFilterChoice){
      case 'descending':
        this.descendingSort();
      break;
      case 'ascending':
        this.ascendingSort();
      break;
      case 'open':
        this.showOpenOnly();
        //console.log(this.requestsView);
      break;

      default:
      this.descendingSort();
    }
  }
  ascendingSort(){
    
    this.requests.sort((a, b) => {
      //console.log("works-asc");
      return a.daysLeft-b.daysLeft;
    });

    this.requestsView=[];
    this.closedView=[];
    for(let request of this.requests){
      if(!request.open){
        this.closedView.push(request);
      }
      else{
        
        this.requestsView.push(request);
      }
    }
    Array.prototype.push.apply(this.requestsView,this.closedView)
  }
  descendingSort(){
    this.requests.sort((a, b) => {
      //console.log("works-desc");
      return b.daysLeft - a.daysLeft;
    });
    this.requestsView=this.requests;
  }
  showOpenOnly(){
    this.requestsView=[];
    for(let request of this.requests){
      if(request.open){
        this.requestsView.push(request);
      }
    }
  }

}
