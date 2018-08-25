import { Component, OnInit } from '@angular/core';
import { SchoolOrdersModel } from '../../../models/school.orders.model';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

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
