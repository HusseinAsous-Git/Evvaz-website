import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-admin-all-tenders',
  templateUrl: './admin-all-tenders.component.html',
  styleUrls: ['./admin-all-tenders.component.scss']
})
export class AdminAllTendersComponent implements OnInit {
  date:Date;
  constructor(private router:Router) { }

  ngOnInit() {
    this.date = new Date();
  }

  getTenderDetails(){
    this.router.navigate(['/admin','tenders','company']);
  }

}
