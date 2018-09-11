import { SchoolTenderModel } from './../models/school.tender.model';

import { TenderModel } from '../models/tender.model';
import {  CompanyModel } from '../models/company.model';
import {  SchoolHistoryModel } from '../models/school.history.model';
import { SchollFollowerModel } from '../models/shool.follower.model';
import { SchoolOrdersModel } from '../models/school.orders.model';
import { SchoolProfileModel } from '../models/school.profile.model';
import { HttpClient } from '@angular/common/http';
import {  Injectable } from "@angular/core";
import { environment } from '../../../environments/environment.prod';
import { TenderCategoryModel } from '../models/tender.category.model';
import { SchoolSingleTender } from '../models/school.single.tender.model';

@Injectable()
export class SchoolService{

        constructor(private httpClient: HttpClient) {}

getSchools(id: number){
    let url = `${environment.apiPath}evvaz/follow/school/${id}`;
        return this.httpClient.get<SchoolProfileModel []>(url); 
}

getOrders(companyId: number){
    let url = `${environment.apiPath}evvaz/orders/${companyId}`;
        return this.httpClient.get<SchoolOrdersModel []>(url); 
}

getProfile(id: number) {
    let url = `${environment.apiPath}evvaz/school/profile/get/${id}`;
    return this.httpClient.get<SchoolProfileModel>(url);
}


updateProfile(data: SchoolProfileModel) {
    let url = `${environment.apiPath}evvaz/school/profile/update`; 
    return this.httpClient.put<SchoolProfileModel>(url,data) ;
}
createProfile(data: SchoolProfileModel){
    let url = `${environment.apiPath}evvaz/school/profile/addProfile`; 
    return this.httpClient.post<SchoolProfileModel>(url,data) ;
}


getFollowers(id: number){
    let url = `${environment.apiPath}evvaz/follow/school/followers/${id}`;
        return this.httpClient.get<SchollFollowerModel[]>(url); 
}

getSchoolOrders(id: number) {
    let url = `${environment.apiPath}evvaz/school/tenders/school/${id}`;
    return this.httpClient.get<SchoolOrdersModel[]>(url);
}

getHistory(id: number){
    let url = `${environment.apiPath}evvaz/school/requests/get/history/${id}`;
    return this.httpClient.get<SchoolHistoryModel[]>(url);
}

getAllCompanies(schoolId: number){
    let url = `${environment.apiPath}evvaz/follow/company/${schoolId}`;
        return this.httpClient.get<CompanyModel[]>(url); 
}


createTender(tenderData : TenderModel){
    let url = `${environment.apiPath}evvaz/school/tenders/`;
    return this.httpClient.post(url,tenderData);

}

getCategories(){
    let url = `${environment.apiPath}evvaz/school/category/getAll`;
    return this.httpClient.get<TenderCategoryModel[]>(url); 
}

getTendersbySchoolId(schoolId: number) {
    let url = `${environment.apiPath}evvaz/school/tenders/school/${schoolId}`;
    return this.httpClient.get<TenderModel[]>(url);
}


getAllCollectiveTenders(){
    let url = `${environment.apiPath}evvaz/takataf/tenders/admin`;
    return this.httpClient.get<SchoolTenderModel[]>(url);
}


getSingleTender(schoolId: number){
    let url = `${environment.apiPath}evvaz/school/tenders/request/school/${schoolId}`;
    return this.httpClient.get(url); 
}

getTender(tenderId: number){
    let url = `${environment.apiPath}evvaz/tender/request/get/${tenderId}`;
    return this.httpClient.get(url); 
}

addCollectiveTender(tenderData: {
    request_school_id: number,
    request_tender_id: number,
    is_aproved: number,
    t_date: number,
     category : {
        cat_name: string,
        count: number
    }   [] 
}
  ){
    let url = `${environment.apiPath}evvaz/tender/request/add`;
    return this.httpClient.post(url,tenderData);
}


getAllOrders(schoolId: number){
    let url = `${environment.apiPath}evvaz/school/requests/get/order/${schoolId}`;
    return this.httpClient.get<SchoolOrdersModel[]>(url);
}


agreeToCompany(companyId: number) {
    let url = `${environment.apiPath}evvaz/response/school/request/accept/${companyId}`;
    return this.httpClient.put(url,{});
}


// deleteCompany(companyId: number){
//     let url = `${environment.apiPath}evvaz/response/school/request/delete/${companyId}`;
//     return this.httpClient.delete(url);
// }

}