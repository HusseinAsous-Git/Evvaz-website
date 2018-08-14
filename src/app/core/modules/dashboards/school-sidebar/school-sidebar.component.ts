import { SchoolService } from './../../../services/school.service';

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
  ngOnInit() {
    this.schoolService.getSchoolOrders(4).subscribe(
      response => {
        for(let r of response) {
          this.orderCount ++;
        }
      }
    )
    this.schoolService.getHistory(4).subscribe(
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
