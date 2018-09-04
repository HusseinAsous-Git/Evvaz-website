import { AdminTenderResolverModel } from './../models/admin.tender.resolve.model';
import { AdminService } from './admin.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "../../../../node_modules/@angular/router";
import { Observable } from "../../../../node_modules/rxjs";
import { Injectable } from "../../../../node_modules/@angular/core";



@Injectable()
export class AdminTenderEditResolver{
    constructor(private adminService: AdminService) {}

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot)
    : Observable<AdminTenderResolverModel> | Promise<AdminTenderResolverModel> | AdminTenderResolverModel{
        return this.adminService.getSingleTender(+activatedRouteSnapshot.params['tenderId']).toPromise().then(
            data => data
        ).catch(
            err => err
        )   
    }
}