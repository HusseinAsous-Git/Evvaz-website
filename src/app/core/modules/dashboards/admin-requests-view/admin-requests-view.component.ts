import { AdminService } from './../../../services/admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-requests-view',
  templateUrl: './admin-requests-view.component.html',
  styleUrls: ['./admin-requests-view.component.scss']
})
export class AdminRequestsViewComponent implements OnInit {
date:Date;
requestId: number;
profile: any;
isLoading = false;  
  constructor(private route: ActivatedRoute, private adminService: AdminService, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.requestId = params['requestId'];
        console.log("Request ID: " + this.requestId)

        this.adminService.getSingleRequest(this.requestId).subscribe(
          response => {
            console.log(response)
            this.profile = response;
          }
        )



      }
    )
    this.date = new Date();
  }



  
  activateRequest(id: number){
    
      this.isLoading = true;
    
    this.adminService.activateRequest(id).subscribe(
      response => { console.log(response);
        this.router.navigate(['/admin','requests'])
        this.isLoading = false;;
      },
      err => console.log(err)
    )

  
    
  

  }



}
