import { environment } from '../../../../environments/environment.prod';
import { SchoolRequest} from '../../models/school-category-request.model';
import { CategoryDetails} from '../../models/purchase-category-details.model';
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
  getCategories(){
    return this.http.get<CategoryDetails[]>(environment.apiPath + 'school/category/getCat');
  }
  getCategoryRequests(cat_id){
    return this.http.get<SchoolRequest[]>(environment.apiPath + 'school/requests/filterCat/'+cat_id);
  }
  getCategoryDetails(cat_id){
    return this.http.get<CategoryDetails>(environment.apiPath + 'school/category/getCat/'+cat_id);
  }
  getRequestDetails(req_id){
    return this.http.get<SchoolRequest>(environment.apiPath + 'school/tenders/'+req_id);
  }
  addView(request){
    return this.http.post(environment.apiPath + 'seen/add',request);
  }
}
