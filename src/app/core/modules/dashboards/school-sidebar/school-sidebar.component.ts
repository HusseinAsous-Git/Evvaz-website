import { SchoolService } from '../../../services/school.service';

import { Component, OnInit } from '@angular/core';
import { UIService } from '../../../services/ui.service';

@Component({
  selector: 'app-school-sidebar',
  templateUrl: './school-sidebar.component.html',
  styleUrls: ['./school-sidebar.component.css']
})
export class SchoolSidebarComponent implements OnInit {

  constructor(private schoolService: SchoolService, public uiService: UIService) { }
  orderCount = 0;
  historyCount = 0;
  loginId: number;
  currentUser;
  companiesCount = 0;
  followCount=0;

  ngOnInit() {

    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    console.log("login ID IS:"+ this.loginId)


    this.schoolService.getSchools(this.loginId).subscribe(
      response => {
        for(let s of response) {
          this.companiesCount ++;
        }
      }
    )
console.log("Company count: " + this.companiesCount)

    this.schoolService.getAllOrders(this.loginId).subscribe(
      response => {
        console.log("Order count:");
        console.log(response)
        for(let r of response) {
          this.orderCount ++;
        }
      }
    )

    this.schoolService.getAllCompanies(this.loginId).subscribe(
      response => {
       
        for(let company of response) {
          this.followCount ++;
          
        }
        console.log(response)
      }
    )



    // this.schoolService.getAllOrders(this.loginId).subscribe(
    //   response => {
        
    //     console.log(response)
    //     this.schoolOrders = response;

    //     for(let o of this.schoolOrders){
    //       this.count ++;
    //     }
        
    //    }

       
    // )

    this.schoolService.getHistory(this.loginId).subscribe(
      response => {
        for(let r of response) {
          this.historyCount ++;
        }
      }
    )

   

  }


  toggleSidebar(){
    console.log("toggle")
    if(this.uiService.getSidebarStatus()){
      console.log(true);
      this.uiService.sidebarStatus = false ; 
    }
  }
}
