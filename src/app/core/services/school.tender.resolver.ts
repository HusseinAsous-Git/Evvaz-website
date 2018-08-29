import { SchoolService } from './school.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "../../../../node_modules/@angular/router";
import { Observable } from "../../../../node_modules/rxjs";
import { Injectable } from "../../../../node_modules/@angular/core";
import { SchoolTenderResolverModel } from '../models/school.tender.resolver.model';



@Injectable()
export class SchoolTenderResolver{
    constructor(private schoolService: SchoolService) {}

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot)
    : Observable<SchoolTenderResolverModel> | Promise<SchoolTenderResolverModel> | SchoolTenderResolverModel{
        return this.schoolService.getTender(+activatedRouteSnapshot.params['tenderId']).toPromise().then(
            data => data
        ).catch(
            err => err
        )   
    }
}