import { CompanyProfileModel } from '../models/company.profile.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class ProfileServiceDashboard{

    constructor(private httpClient: HttpClient){}


    getProfile(id:number){
        let url = `${environment.apiPath}profile/get/${id}`;
        return this.httpClient.get<CompanyProfileModel>(url);
    }


    updateProfile(data : CompanyProfileModel) { 
        
        let url = `${environment.apiPath}profile/updates `; 
        return this.httpClient.put<CompanyProfileModel>(url,data) ; 
    }




}