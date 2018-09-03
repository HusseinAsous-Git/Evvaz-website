import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order-view',
  templateUrl: './admin-order-view.component.html',
  styleUrls: ['./admin-order-view.component.scss']
})
export class AdminOrderViewComponent implements OnInit {
date:Date;
offerId: number;
offer;
  constructor(private adminService: AdminService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.date = new Date();
    this.activatedRoute.params.subscribe(
      (params:Params) => {
        this.offerId = +params['orderId'];
      }
    )
    this.adminService.getOrderByOfferId(this.offerId).subscribe(
      (response) => {
        console.log(response);
        this.offer = response;
      }
    )
  }

}
