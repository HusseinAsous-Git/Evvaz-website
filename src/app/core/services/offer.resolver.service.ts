import { CompanyNewOfferModel } from '../models/company.offer.new.model';
import { CompanyService } from './company.service';
import { CompanyOfferModel } from '../models/company.offer.see.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OfferResolver implements Resolve<CompanyNewOfferModel>{

    constructor(private companyService: CompanyService) {}

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot)
    : Observable<CompanyNewOfferModel> | Promise<CompanyNewOfferModel> | CompanyNewOfferModel {
        return this.companyService.getOffer(+activatedRouteSnapshot.params['id']).toPromise().then(
            data => data
        ).catch(
            err => err
        )   
    }

} 