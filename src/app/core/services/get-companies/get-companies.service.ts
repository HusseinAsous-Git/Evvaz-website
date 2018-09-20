import { environment } from '../../../../environments/environment.prod';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


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
  getMyCompanies(user_id){
    return this.http.get(environment.apiPath + 'follow/companies/'+user_id);
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
  
  unfollowCompany(org_id,school_id){
    console.log(this.follow_req_body);
    return this.http.delete(environment.apiPath +'follow/org/'+org_id+'/follower/'+school_id);
  }
  isFollowedCompany(organization_id,logged_id){
    return this.http.get(environment.apiPath + 'follow/company/' + organization_id +'/school/'+ logged_id);
  }
  getAreas(){
    return this.http.get<Object[]>(environment.apiPath + 'area/');
  }
  getAreaCities(){
    return this.http.get<Object[]>(environment.apiPath + 'area/cities/');
  }
  getCategories(){
    return this.http.get<Object[]>(environment.apiPath + 'cat/getAll');
  }
}
