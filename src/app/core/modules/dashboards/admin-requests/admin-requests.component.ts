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
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.date = new Date();
    this.adminService.getAllRequests().subscribe(
      response => {
        this.requests = response;
        console.log(response)

        for(let i of this.requests){
          this.count++;
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

}