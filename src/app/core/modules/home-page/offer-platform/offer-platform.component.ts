import { GetCompaniesService } from '../../../services/get-companies/get-companies.service';
import { environment } from '../../../../../environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
/*model*/
import { CompaniesInfo } from '../../../models/companies-info';

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
  console.log("this user id is ====> ",this.UserData['login_id']);
      this.Companies.getMyCompanies(this.UserData['login_id']).subscribe(
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
          console.log('Follow Worked');

          location.reload();
        }
        else{
          console.log('Follow Fail');
        }
      }
    );
    
  }
  unfollowCompany(organization_id){
    let follower_id=this.UserData['login_id'];
    this.Companies.unfollowCompany(organization_id,follower_id)
    .subscribe(
      (response) =>{
        if(response['status']==200){
          console.log('Unfollow Worked');

          location.reload();
        }
        else{
          console.log('unfollow Fail');
        }
      }
    );
  }
 
}



