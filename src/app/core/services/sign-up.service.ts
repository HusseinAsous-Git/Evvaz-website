import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SignUpService {

  constructor(private http: HttpClient) { }

  signUp(user) {
    return this.http.post(environment.apiPath + 'register/add', user);
  }
  getAreas(){
    return this.http.get<Object[]>(environment.apiPath + 'area/');
  }
  getAreaCities(){
    return this.http.get(environment.apiPath + 'area/cities/');
  }
}