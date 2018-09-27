import { AdminService } from './../../../services/admin.service';
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
  orders:any;
  constructor(private adminService: AdminService, private router:Router) { }

  ngOnInit() {
    this.date = new Date();

    this.adminService.getAllOrders().subscribe(
      response => {
     //   console.log(response);
        this.orders = response;
        for(let o of this.orders) {
          o.company_logo_image = 'data:image/png;base64,' +  o.company_logo_image;
          o.school_logo_image =  'data:image/png;base64,' +o.school_logo_image;
        }
      }
    )
  }


  linkNav(orderId: number){
    this.router.navigate(['/admin','orders',orderId,'view'])
  }


}
