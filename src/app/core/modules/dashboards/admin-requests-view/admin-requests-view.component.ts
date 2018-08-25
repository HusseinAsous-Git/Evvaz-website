import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-requests-view',
  templateUrl: './admin-requests-view.component.html',
  styleUrls: ['./admin-requests-view.component.scss']
})
export class AdminRequestsViewComponent implements OnInit {
date:Date;
  constructor() { }

  ngOnInit() {
    this.date = new Date();
  }

}
