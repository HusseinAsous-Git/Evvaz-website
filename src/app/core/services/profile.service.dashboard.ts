import { CategoryModel } from '../models/category.model';
import { CompanyProfileModel } from '../models/company.profile.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class ProfileServiceDashboard{

    constructor(private httpClient: HttpClient){}


    getProfile(id:number){
        let url = `${environment.apiPath}company/profile/${id}`;
        return this.httpClient.get<CompanyProfileModel>(url);
    }


    updateProfile(data : CompanyProfileModel) { 
        
        let url = `${environment.apiPath}company/profile/`; 
        return this.httpClient.put<CompanyProfileModel>(url,data) ; 
    }

    createProfile(data: CompanyProfileModel){
        let url = `${environment.apiPath}company/profile/`;
        return this.httpClient.post<CompanyProfileModel>(url,data) ; 
    }


    getCategories(){
        let url = `${environment.apiPath}cat/getAll`;
        return this.httpClient.get<CategoryModel []>(url);
    }


}