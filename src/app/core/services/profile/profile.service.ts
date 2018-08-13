import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  // getFollowers(id) {
  //   return this.http.get(environment.apiPath + 'follow/get/following/' + id);
  // }

  getOffers(id) {
    return this.http.get(environment.apiPath + 'company/offer/'+id+'/company');
  }
  getOfferDetails(id){
    return this.http.get(environment.apiPath + 'company/offer/'+id);
  }
  // getCategory(id) {
  //   return this.http.get(environment.apiPath + 'cat/get/' + id);
  // }
}
