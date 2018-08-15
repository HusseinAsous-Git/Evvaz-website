import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collective-tender',
  templateUrl: './collective-tender.component.html',
  styleUrls: ['./collective-tender.component.scss']
})
export class CollectiveTenderComponent implements OnInit {
date:Date;
  constructor() { }

  ngOnInit() {
    this.date = new Date();
  }

}
