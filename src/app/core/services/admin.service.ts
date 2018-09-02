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

}