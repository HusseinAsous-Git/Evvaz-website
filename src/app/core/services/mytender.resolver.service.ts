import { ActivatedRouteSnapshot, RouterStateSnapshot } from "../../../../node_modules/@angular/router";
import { Observable } from "../../../../node_modules/rxjs";
import { SchoolOrdersModel } from "../models/school.orders.model";
import { SchoolService } from "./school.service";



export class MyTenderResolver{
    constructor(private schoolService: SchoolService) {}

    // resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot)
    // : Observable<SchoolOrdersModel> | Promise<SchoolOrdersModel> | SchoolOrdersModel{
    //     return this.schoolService.getTender(+activatedRouteSnapshot.params['tenderId']).toPromise().then(
    //         data => data
    //     ).catch(
    //         err => err
    //     )   
    // }
}