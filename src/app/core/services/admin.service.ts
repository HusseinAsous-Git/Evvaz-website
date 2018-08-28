import { AdminRequestModel } from './../models/admin.request.model';
import { AdminTenderModel } from './../models/admin.tender.model';
import { Injectable } from "../../../../node_modules/@angular/core";

import { environment } from "../../../environments/environment.prod";
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { AdminCategory } from '../models/admin.cat.model';




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

    activateRequest(id: number){
        let url = `${environment.apiPath}register/confirm/${id}`;
        return this.httpClient.get(url);
    }

}