import { Component, OnInit } from '@angular/core';
import { AdminRequestModel } from '../../../models/admin.request.model';
import { AdminService } from '../../../services/admin.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.scss']
})
export class ArchivedComponent implements OnInit {

  date:Date;
requests;
count=0;
schoolRequests = [];
companyRequests = [];
  constructor(private adminService: AdminService, private router:Router) { }

  ngOnInit() {
    this.date = new Date();
    this.adminService.getAllArchived().subscribe(
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
      err => console.log("ERROR IN archived COMPONENTS")
    )
  }




  activateRequest(id: number, i: number){
    this.adminService.activateRequest(id).subscribe(
      response => 
      //console.log(response),
      err => console.log("ERROR IN archived COMPONENTS")
    )

    this.requests.splice(i, 1);
    
  

  }

  goToRequests(id:number){
    this.router.navigate(['/admin','archived',id,'view'])
  }
  

}
