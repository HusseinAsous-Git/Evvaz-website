import { PageModel } from '../models/page.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CompanyOfferModel } from '../models/company.offer.see.model';
import { CompanyNewOfferModel } from '../models/company.offer.new.model';
import { environment } from '../../../environments/environment.prod';


@Injectable()
export class CompanyService {

    constructor(private httpClient: HttpClient){ }

    

    seeAllOffers(companyId: number){
        let url = `${environment.apiPath}company/offer/${companyId}/company`;
        return this.httpClient.get<CompanyOfferModel []>(url); 
    }

    getOffer(id:number){
        let url = `${environment.apiPath}company/offer/${id}`;
        return this.httpClient.get<CompanyOfferModel>(url); 
    }
    
    
    addOffer(offer: CompanyNewOfferModel) {
        let url = `${environment.apiPath}company/offer/` ;
        return this.httpClient.post(url,offer);
    }

    
    deleteOffer(id:number){
        let url = `${environment.apiPath}companyOffer/delete/${id}` ;
        return this.httpClient.delete<CompanyOfferModel>(url) ;
    }


    update(data) { 
        
        let url = `${environment.apiPath}company/offer/ `; 
        return this.httpClient.put<CompanyNewOfferModel>(url,data) ; 
    }


    follow(data : {follower_id: number, organization_id: number}) {
        let url = `${environment.apiPath}follow/add`; 
        return this.httpClient.post(url,data);
    }

    removeFollow(data : {orgId: number, followerId: number}){
        let url = `${environment.apiPath}follow/org/${data.orgId}/follower/${data.followerId}`;
        return this.httpClient.delete(url);
    }

    
    
}