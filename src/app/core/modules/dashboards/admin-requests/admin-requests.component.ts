import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.scss']
})
export class AdminRequestsComponent implements OnInit {
date:Date;
  constructor() { }

  ngOnInit() {
    this.date = new Date();
  }

}
