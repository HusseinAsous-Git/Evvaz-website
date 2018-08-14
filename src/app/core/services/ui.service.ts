import { Injectable } from "@angular/core";

@Injectable()
export class UIService { 
    sidebarStatus : boolean = false ;
    getSidebarStatus() {
        return this.sidebarStatus ; 
    } 
}