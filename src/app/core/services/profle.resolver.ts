import {  ProfileServiceDashboard } from './profile.service.dashboard';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CompanyProfileModel } from '../models/company.profile.model';
import { Observable } from 'rxjs';




@Injectable()
export class ProfileResolver{

    constructor(private profileService: ProfileServiceDashboard) {}

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot)
    : Observable<CompanyProfileModel> | Promise<CompanyProfileModel> | CompanyProfileModel {
        return this.profileService.getProfile(3).toPromise().then(
            data => data
        ).catch(
            err => err
        )   
    }

}