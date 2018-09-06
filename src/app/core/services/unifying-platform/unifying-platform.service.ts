import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UnifyingPlatformService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  getUniCatData(id){
    return this.http.get(environment.apiPath + 'tender/request/category/'+id);
  }
  addView(request){
    return this.http.post(environment.apiPath + 'tender/seen/add',request);
  }
}
