import { environment } from '../../../../environments/environment.prod';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PurchasePlatformService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  getCategory(){
    return this.http.get(environment.apiPath + 'school/category/getCat');
  }

}
