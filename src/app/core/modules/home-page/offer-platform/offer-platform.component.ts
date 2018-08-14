import { GetCompaniesService } from './../../../services/get-companies/get-companies.service';
import { environment } from './../../../../../environments/environment.prod';

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
  UserData:Object;
  // followSuccess:Boolean=false;
  // followListResponseHolder=null;
  // followFlag=1;
  constructor(private http: Http, private Companies: GetCompaniesService) { }
  // get all companies
  
  ngOnInit(): void {
  let user = localStorage.getItem('@MYUSER');
  this.UserData = JSON.parse(user);
  console.log("this user id is ====> ",this.UserData['login_id'])
      this.Companies.getAllCompanies().subscribe(
        (Companies) => {
          this.companiesInfo =Companies;  
          //console.log(this.companiesInfo);     
        },
        (error) => {
          console.log('errors ', error)
        }
      );
      //this.followedList();
    
  }
  
  followCompany(organization_id){
    let follower_id=this.UserData['login_id'];
    this.Companies.followCompany(organization_id,follower_id)
    .subscribe(
      (response) =>{
        if(response['status']==200){
          //this.followSuccess=true;
          console.log('Follow Worked');
          return true;
        }
        else{
          //this.followSuccess=true;
          console.log('Follow Fail');
          return false;
        }
      }
    );
    
  }
  // isFollowedCompany(organization_id){

  //   for(let organization of this.followListResponseHolder){
  //     if(organization['organization_id']==organization_id){
  //       console.log(organization['organization_id']);
  //      return true;
  //     }
  //   }
  //   return false;
    
  // }
  // followedList(){
  //   let logged_id=this.UserData['login_id'];
  //   this.Companies.getFollowedCompanies(logged_id).subscribe(
  //     (response) =>{
  //       if(response['status']==200){
  //         this.followListResponseHolder=response['list'];
  //       }
        
  //     }
  //   );
  // }
}



