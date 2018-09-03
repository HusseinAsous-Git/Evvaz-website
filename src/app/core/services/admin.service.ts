import { SchoolSingleTender } from './../models/school.single.tender.model';
import { AdminRequestModel } from './../models/admin.request.model';
import { AdminTenderModel } from './../models/admin.tender.model';
import { Injectable } from "../../../../node_modules/@angular/core";

import { environment } from "../../../environments/environment.prod";
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { AdminCategory } from '../models/admin.cat.model';
import { AdminMyTenderModel } from '../models/admin.mytender.model';




@Injectable()
export class AdminService{

    constructor(private httpClient: HttpClient) {}

    createTender(tenderData: AdminTenderModel){
        let url = `${environment.apiPath}takataf/tenders/`;
        return this.httpClient.post(url,tenderData);
    }

    getCategories(){
        let url = `${environment.apiPath}cat/getAll`;
        return this.httpClient.get<AdminCategory[]>(url); 
    }

    getAllRequests(){
        let url = `${environment.apiPath}register/getInActive`;
        return this.httpClient.get<AdminRequestModel[]>(url); 
    }
    getSingleRequest(requestId: number) {
        let url = `${environment.apiPath}register/get/${requestId}`;
        return this.httpClient.get(url);
    }

    activateRequest(id: number){
        let url = `${environment.apiPath}register/confirm/${id}`;
        return this.httpClient.get(url);
    }

    getmMyTenders(){
        let url = `${environment.apiPath}takataf/tenders/admin`;
        return this.httpClient.get<AdminMyTenderModel[]>(url); 
    }

    getSingleTender(tenderId: number){
        let url = `${environment.apiPath}tender/request/${tenderId}`;
        return this.httpClient.get(url); 
    }



    getTenderById(tenderId: number) {
        let url = `${environment.apiPath}request/tender/${tenderId}`;
        return this.httpClient.get(url); 
    }
    
  getTenderCategories(tenderId: number){
    let url = `${environment.apiPath}tender/request/get/${tenderId}`;
    return this.httpClient.get(url); 
  }

  updateTender(tenderData : {
    tender_id: number,
    tender_title:string,
    tender_explain: string,
    tender_display_date: number,
    tender_expire_date: number,
    tender_company_display_date: number,
    tender_company_expired_date: number,
    cats : {
        category_name: string;
    } [] 

  }){
    let url = `${environment.apiPath}takataf/tenders/`;
    return this.httpClient.put(url,tenderData); 
    
  }


  deleteTender(tenderId: number) {
    let url = `${environment.apiPath}takataf/tenders/${tenderId}`;
    return this.httpClient.delete(url); 
  }


  getTenderDetailsInCompany(tenderId: number) {
    let url = `${environment.apiPath}tender/details/company/${tenderId}`;
    return this.httpClient.get(url);
    
  }

  getAllCompaniesInTender(tenderId: number){
    let url = `${environment.apiPath}tender/companies/${tenderId}`;
    return this.httpClient.get(url);
  }


  agreeForCompany(companyId: number, tenderId: number){
    let url = `${environment.apiPath}tender/companies/${companyId}/${tenderId}`;
    return this.httpClient.put(url,{});
}




getAllOrders(){
    let url = `${environment.apiPath}admin/orders/`;
    return this.httpClient.get(url);
    
}


getOrderByOfferId(offerId: number) {
    let url = `${environment.apiPath}admin/orders/${offerId}`;
    return this.httpClient.get(url);
}


}