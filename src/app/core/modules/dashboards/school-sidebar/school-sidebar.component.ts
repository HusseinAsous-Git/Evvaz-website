import { SchoolService } from './../../../services/school.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-sidebar',
  templateUrl: './school-sidebar.component.html',
  styleUrls: ['./school-sidebar.component.css']
})
export class SchoolSidebarComponent implements OnInit {

  constructor(private schoolService: SchoolService) { }
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

}
