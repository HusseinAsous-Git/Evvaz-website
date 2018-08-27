import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order-view',
  templateUrl: './admin-order-view.component.html',
  styleUrls: ['./admin-order-view.component.scss']
})
export class AdminOrderViewComponent implements OnInit {
date:Date;
  constructor() { }

  ngOnInit() {
    this.date = new Date();
  }

}
