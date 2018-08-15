import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-tender',
  templateUrl: './view-tender.component.html',
  styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent implements OnInit {
date: Date;
  constructor() { }

  ngOnInit() {
    this.date = new Date();
  }

}
