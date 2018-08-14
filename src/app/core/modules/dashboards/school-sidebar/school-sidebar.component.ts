import { SchoolService } from '../../../services/school.service';

import { Component, OnInit } from '@angular/core';
import { UIService } from '../../../services/ui.service';

@Component({
  selector: 'app-school-sidebar',
  templateUrl: './school-sidebar.component.html',
  styleUrls: ['./school-sidebar.component.css']
})
export class SchoolSidebarComponent implements OnInit {

  constructor(private schoolService: SchoolService, private uiService: UIService) { }
  orderCount = 0;
  historyCount = 0;
  loginId: number;
  currentUser;
  companiesCount = 0;


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

    this.schoolService.getSchoolOrders(this.loginId).subscribe(
      response => {
        for(let r of response) {
          this.orderCount ++;
        }
      }
    )
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
