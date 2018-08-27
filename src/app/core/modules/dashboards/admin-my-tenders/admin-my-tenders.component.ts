import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-my-tenders',
  templateUrl: './admin-my-tenders.component.html',
  styleUrls: ['./admin-my-tenders.component.scss']
})
export class AdminMyTendersComponent implements OnInit {
  date: Date;
  constructor() { }

  ngOnInit() {
    this.date = new Date();
  }

}
