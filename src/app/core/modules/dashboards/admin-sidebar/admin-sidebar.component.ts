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
historyFlag = false;
static c : number = 0;
  constructor(public uiService:UIService, private adminService:AdminService) {
    let data = +localStorage.getItem('hisCount');
    if(data==null) this.historyCount = 0;
    else this.historyCount = data;
   
  }

   

  ngOnInit() {
    this.getHistoryCount();
    let data = +localStorage.getItem('hisCount');
    if(data !== this.historyCount ){
      localStorage.setItem('hisCount',this.historyCount.toString());
    }
      
    


    // this.adminService.getAllRequests().subscribe(
    //   response => {
    //     this.requests = response;
        
    //     console.log(response)

    //     for(let request of this.requests){
    //       this.count++;
    //       if(request.registration_role === 'school') {
    //         this.schoolRequests.push(request);
    //       }else if (request.registration_role=== 'company'){
    //         this.companyRequests.push(request);
    //       }else {
    //         this.count--;
    //       }
    //     }


    this.adminService.getAllRequests().subscribe(
      response => {
        this.requests = response;
        console.log(response)

        for(let request of this.requests){
          this.requestCount++;
          if(request.registration_role === 'admin') {
           this.requestCount--;
        }
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


  getHistoryCount (){
    this.adminService.getAllHistory().subscribe(
      response => {
        console.log(response);
        this.history = response;
        this.historyCount  =  response.length;
      }
    )
    
  }
 

}
