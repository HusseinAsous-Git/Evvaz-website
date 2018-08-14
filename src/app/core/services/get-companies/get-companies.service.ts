import { environment } from './../../../../environments/environment.prod';
import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

/*models*/
import { CompaniesInfo } from './../../models/companies-info';

@Injectable()
export class GetCompaniesService {

  follow_req_body={
    "organization_id":0,
    "follower_id":0
  };
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllCompanies() {
    return this.http.get(environment.apiPath + 'profile/getAll');
  }

  getCompany(id) {
    return this.http.get(environment.apiPath + 'profile/get/' + id);
  }
  getCompanyFollowCount(id){
    return this.http.get(environment.apiPath +'follow/followers/'+id+'/count');
  }
  getCompanyOffersCount(id){
    return this.http.get(environment.apiPath +'company/offer/'+id+'/count');
  }

  followCompany(org_id,school_id){
    
    this.follow_req_body.organization_id=org_id;
    this.follow_req_body.follower_id=school_id;
    console.log(this.follow_req_body);
    return this.http.post(environment.apiPath +'follow/add',this.follow_req_body);
  }
  getFollowedCompanies(logged_id){
    return this.http.get(environment.apiPath + 'follow/get/following/' + logged_id);
  }
}
