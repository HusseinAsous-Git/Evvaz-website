import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent implements OnInit {
date:Date;
  constructor(private router:Router) { }

  ngOnInit() {
    this.date = new Date();
  }


  
  linkNavHistory(orderId: number){
    this.router.navigate(['/admin','history',orderId,'view'])
  }

}
