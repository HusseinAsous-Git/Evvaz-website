import { SchoolSingleTender } from './../models/school.single.tender.model';
import { AdminRequestModel } from './../models/admin.request.model';
import { AdminTenderModel } from './../models/admin.tender.model';
import { Injectable } from "../../../../node_modules/@angular/core";

import { environment } from "../../../environments/environment.prod";
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { AdminCategory } from '../models/admin.cat.model';
import { AdminMyTenderModel } from '../models/admin.mytender.model';




@Injectable()
export class AdminService{

    constructor(private httpClient: HttpClient) {}

    createTender(tenderData: AdminTenderModel){
        let url = `${environment.apiPath}evvaz/takataf/tenders/`;
        return this.httpClient.post(url,tenderData);
    }

    getCategories(){
        let url = `${environment.apiPath}evvaz/cat/getAll`;
        return this.httpClient.get<AdminCategory[]>(url); 
    }

    getAllRequests(){
        let url = `${environment.apiPath}evvaz/register/getInActives`;
        return this.httpClient.get<AdminRequestModel[]>(url); 
    }
    getSingleRequest(requestId: number) {
        let url = `${environment.apiPath}evvaz/register/get/${requestId}`;
        return this.httpClient.get(url);
    }

    activateRequest(id: number){
        let url = `${environment.apiPath}evvaz/register/confirm/${id}`;
        return this.httpClient.get(url);
    }

    considerRequest(id: number){
        let url = `${environment.apiPath}evvaz/register/consider/${id}`;
        return this.httpClient.put(url,{});
    }

    archiveRequest(id: number){ 
        let url = `${environment.apiPath}evvaz/register/Archive/${id}`;
        return this.httpClient.put(url,{});
    }

    getAllConsidered(){
        let url = `${environment.apiPath}evvaz/register/getInActive/consider`;
        return this.httpClient.get<AdminMyTenderModel[]>(url);
    }

    getAllArchived(){
        let url = `${environment.apiPath}evvaz/register/getInActive/archived`;
        return this.httpClient.get<AdminMyTenderModel[]>(url);
    }
    getmMyTenders(){
        let url = `${environment.apiPath}evvaz/takataf/tenders/admin`;
        return this.httpClient.get<AdminMyTenderModel[]>(url); 
    }

    getSingleTender(tenderId: number){
        let url = `${environment.apiPath}evvaz/tender/request/${tenderId}`;
        return this.httpClient.get(url); 
    }



    getTenderById(tenderId: number) {
        let url = `${environment.apiPath}evvaz/request/tender/${tenderId}`;
        return this.httpClient.get(url); 
    }
    
  getTenderCategories(tenderId: number){
    let url = `${environment.apiPath}evvaz/tender/request/get/${tenderId}`;
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
    let url = `${environment.apiPath}evvaz/takataf/tenders/`;
    return this.httpClient.put(url,tenderData); 
    
  }


  deleteTender(tenderId: number) {
    let url = `${environment.apiPath}evvaz/takataf/tenders/${tenderId}`;
    return this.httpClient.delete(url); 
  }


  getTenderDetailsInCompany(tenderId: number) {
    let url = `${environment.apiPath}evvaz/tender/details/company/${tenderId}`;
    return this.httpClient.get(url);
    
  }

  getAllCompaniesInTender(tenderId: number){
    let url = `${environment.apiPath}evvaz/tender/companies/${tenderId}`;
    return this.httpClient.get(url);
  }


  agreeForCompany(companyId: number, tenderId: number){
    let url = `${environment.apiPath}evvaz/tender/companies/${companyId}/${tenderId}`;
    return this.httpClient.put(url,{});
}




getAllOrders(){
    let url = `${environment.apiPath}evvaz/admin/orders/`;
    return this.httpClient.get(url);
    
}


getOrderByOfferId(offerId: number) {
    let url = `${environment.apiPath}evvaz/admin/orders/${offerId}`;
    return this.httpClient.get(url);
}

getAllHistory() {
    let url = `${environment.apiPath}evvaz/admin/orders/history/`;
    return this.httpClient.get(url);
}

getHistoryOrder(orderId:number) {
    let url = `${environment.apiPath}evvaz/admin/orders/history/${orderId}`;
    return this.httpClient.get(url);
}


addShip(data : {ship:number, ship_company_offer_id: number}) {
    let url = `${environment.apiPath}evvaz/admin/orders/ship`;
    return this.httpClient.post(url,data);
}

}