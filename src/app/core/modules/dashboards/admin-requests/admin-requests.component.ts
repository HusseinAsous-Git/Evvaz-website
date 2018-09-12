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
        
        console.log(response)

        for(let request of this.requests){
          this.count++;
          if(request.registration_role === 'school') {
            this.schoolRequests.push(request);
          }else if (request.registration_role=== 'company'){
            this.companyRequests.push(request);
          }
        }

      },
      err => console.log(err)
    )
  }




  activateRequest(id: number, i: number){
    this.adminService.activateRequest(id).subscribe(
      response => console.log(response),
      err => console.log(err)
    )

    this.requests.splice(i, 1);
    
  

  }

  goToRequests(id:number){
    this.router.navigate(['/admin','request',id,'view'])
  }
  

}