import { Router } from '@angular/router';
import { AdminRequestModel } from './../../../models/admin.request.model';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.scss']
})
export class AdminRequestsComponent implements OnInit {
date:Date;
requests: AdminRequestModel [];
count=0;
schoolRequests = [];
companyRequests = [];
  constructor(private adminService: AdminService, private router:Router) { }

  ngOnInit() {
    this.date = new Date();
    this.adminService.getAllRequests().subscribe(
      response => {
        this.requests = response;
        
     //   console.log(response)

        for(let request of this.requests){
          this.count++;
          if(request['registrationRole'] === 'school') {
            this.schoolRequests.push(request);
          }else if (request['registrationRole'] === 'company'){
            this.companyRequests.push(request);
          }else {
            this.count--;
          }
        }

      },
      err => console.log("ERROR IN admin-requests COMPONENTS")
    )
  }




  activateRequest(id: number, i: number){
    this.adminService.activateRequest(id).subscribe(
    //  response => console.log(response),
      err => console.log("ERROR IN admin-requests COMPONENTS")
    )

    this.requests.splice(i, 1);
    
  

  }

  goToRequests(id:number){
    this.router.navigate(['/admin','request',id,'view'])
  }
  

}