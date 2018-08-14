import {  SchoolHistoryModel } from '../models/school.history.model';
import { SchollFollowerModel } from '../models/shool.follower.model';
import { SchoolOrdersModel } from '../models/school.orders.model';
import { SchoolProfileModel } from '../models/school.profile.model';
import { HttpClient } from '@angular/common/http';
import {  Injectable } from "@angular/core";
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class SchoolService{

        constructor(private httpClient: HttpClient) {}

getSchools(id: number){
    let url = `${environment.apiPath}follow/school/${id}`;
        return this.httpClient.get<SchoolProfileModel []>(url); 
}

getOrders(companyId: number){
    let url = `${environment.apiPath}orders/${companyId}`;
        return this.httpClient.get<SchoolOrdersModel []>(url); 
}

getProfile(id: number) {
    let url = `${environment.apiPath}school/profile/get/${id}`;
    return this.httpClient.get<SchoolProfileModel>(url);
}


updateProfile(data: SchoolProfileModel) {
    let url = `${environment.apiPath}school/profile/update`; 
    return this.httpClient.put<SchoolProfileModel>(url,data) ;
}


getFollowers(id: number){
    let url = `${environment.apiPath}follow/school/followers/${id}`;
        return this.httpClient.get<SchollFollowerModel[]>(url); 
}

getSchoolOrders(id: number) {
    let url = `${environment.apiPath}school/requests/get/${id}`;
    return this.httpClient.get<SchoolOrdersModel[]>(url);
}

getHistory(id: number){
    let url = `${environment.apiPath}school/requests/get/history/${id}`;
    return this.httpClient.get<SchoolHistoryModel[]>(url);
}

}