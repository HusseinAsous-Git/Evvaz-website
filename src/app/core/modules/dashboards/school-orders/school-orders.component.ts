
import { Component, OnInit } from '@angular/core';
import { SchoolOrdersModel } from '../../../models/school.orders.model';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-school-orders',
  templateUrl: './school-orders.component.html',
  styleUrls: ['./school-orders.component.css']
})
export class SchoolOrdersComponent implements OnInit {

  private schoolOrders : SchoolOrdersModel [];
  count = 0;
  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.schoolService.getSchoolOrders(4).subscribe(
      response => {
        
        console.log(response)
        this.schoolOrders = response;

        for(let o of this.schoolOrders){
          this.count ++;
        }
        
       }

       
    )
  }

}
