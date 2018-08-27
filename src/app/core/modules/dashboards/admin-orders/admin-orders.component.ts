import { Component, OnInit } from '@angular/core';
import { SchoolOrdersModel } from '../../../models/school.orders.model';
import { SchoolService } from '../../../services/school.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
date:Date;
  private schoolOrders : SchoolOrdersModel [];
  count = 0;
  constructor(private schoolService: SchoolService, private router:Router) { }

  ngOnInit() {
    this.date = new Date();
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


  linkNav(orderId: number){
    this.router.navigate(['/admin','orders',orderId,'view'])
  }


}
