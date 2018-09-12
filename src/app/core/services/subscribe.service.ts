import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class SubscribeService {

  constructor(private http: HttpClient) {

  }

  addToMailList(email){
    return this.http.post(environment.apiPath + 'receive/news/mail/', email);
  }
}
