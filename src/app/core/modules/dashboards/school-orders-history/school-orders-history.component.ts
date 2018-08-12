
import { Component, OnInit } from '@angular/core';
import { SchoolHistoryModel } from '../../../models/school.history.model';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-school-orders-history',
  templateUrl: './school-orders-history.component.html',
  styleUrls: ['./school-orders-history.component.css']
})
export class SchoolOrdersHistoryComponent implements OnInit {

  private schoolHistory : SchoolHistoryModel [];
  count = 0;
  constructor(private schoolService: SchoolService) { }

  ngOnInit() {

    this.schoolService.getHistory(4).subscribe(
      response => {
        this.schoolHistory = response;
        console.log(response);

        for(let h of this.schoolHistory){
          this.count ++;
        }
      }
    )
  }

}
