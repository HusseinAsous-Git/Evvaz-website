import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '../../../../../../node_modules/@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-archive-view',
  templateUrl: './admin-archive-view.component.html',
  styleUrls: ['./admin-archive-view.component.scss']
})
export class AdminArchiveViewComponent implements OnInit {

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
        response => { 
          console.log("Confirmation: ");
          console.log(response);
          this.router.navigate(['/admin','requests'])
          this.isLoading = false;;
        },
        err => console.log(err)
      )
  
    }
  
    considerRequest(id:number) {
      this.isLoading = true;
      this.adminService.considerRequest(id).subscribe(
        response => { 
          console.log("Consideration: ");
          console.log(response);
          this.router.navigate(['/admin','requests','consider'])
          this.isLoading = false;;
        },
        err => console.log(err)
      )
  }
  
  archiveRequest(id:number) {
    this.isLoading = true;
    this.adminService.archiveRequest(id).subscribe(
      response => { 
        console.log("Consideration: ");
        console.log(response);
        this.router.navigate(['/admin','requests','archive'])
        this.isLoading = false;;
      },
      err => console.log(err)
    )
  }
  
  
  
}
