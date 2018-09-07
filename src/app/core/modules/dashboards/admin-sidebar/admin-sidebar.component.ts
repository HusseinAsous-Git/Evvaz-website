import { AdminService } from './../../../services/admin.service';
import { UIService } from './../../../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
history;
requests;
orders;
historyCount=0;
requestCount=0;
orderCount=0;
  constructor(public uiService:UIService, private adminService:AdminService) { }

  ngOnInit() {

    this.adminService.getAllHistory().subscribe(
      response => {
        console.log(response);
        this.history = response;
        for(let h of this.history){
         this.historyCount++;
        }
      }
    )

    this.adminService.getAllRequests().subscribe(
      response => {
        this.requests = response;
        console.log(response)

        for(let i of this.requests){
          this.requestCount++;
        }

      },
      err => console.log(err)
    )

    this.adminService.getAllOrders().subscribe(
      response => {
        console.log(response);
        this.orders = response;
        for(let o of this.orders) {
          this.orderCount++;
        }
      }
    )

  }


  // toggleSidebar(){
  //   console.log("toggle on sidebar")
  //   if(this.uiService.getSidebarStatus()){
  //     console.log(true);
  //     this.uiService.sidebarStatus = false ; 
  //   }
  // }

 

}
