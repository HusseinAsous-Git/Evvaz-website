import { SchoolProfileModel } from '../models/school.profile.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment.prod';




@Injectable()
export class SchoolProfileService{

    constructor(private httpClient: HttpClient){}


    getAll(){
        let url = `${environment.apiPath}evvazz/school/profile/getProfiles`;
        return this.httpClient.get<SchoolProfileModel []>(url); 
    }


}