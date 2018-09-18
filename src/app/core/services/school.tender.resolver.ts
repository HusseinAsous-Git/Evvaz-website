import { SchoolService } from './school.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SchoolTenderResolverModel } from '../models/school.tender.resolver.model';



@Injectable()
export class SchoolTenderResolver {
    constructor(private schoolService: SchoolService) {}
    

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot)
    : Observable<SchoolTenderResolverModel> | Promise<SchoolTenderResolverModel> | SchoolTenderResolverModel{
        return this.schoolService.getTender(+activatedRouteSnapshot.params['tenderId'],+activatedRouteSnapshot.params['schoolId']).toPromise().then(
            data => data
        ).catch(
            err => err
        )   
    }
}