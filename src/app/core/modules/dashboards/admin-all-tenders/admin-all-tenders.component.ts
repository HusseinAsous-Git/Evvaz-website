import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../../node_modules/@angular/router';
import { AdminService } from '../../../services/admin.service';
import { AdminMyTenderModel } from '../../../models/admin.mytender.model';

@Component({
  selector: 'app-admin-all-tenders',
  templateUrl: './admin-all-tenders.component.html',
  styleUrls: ['./admin-all-tenders.component.scss']
})
export class AdminAllTendersComponent implements OnInit {
  date:Date;
  count =0;
  myTenders : AdminMyTenderModel [];
  
  constructor(private router:Router, private adminService:AdminService) { }

  ngOnInit() {
    this.date = new Date();

    this.adminService.getmMyTenders().subscribe(
      response => {
      //  console.log(response);
        this.myTenders = response;

        for(let o of this.myTenders){
          var oneDay = 24*60*60*1000;
          var currentDate = new Date();
          o.dayLeft = Math.round(Math.abs((o.tender_expire_date -currentDate.getTime())/(oneDay)));
          if(currentDate.getTime() > o.tender_expire_date){
            o.status = "Company Tender";
          }else {
            o.status = "School Tender";
          }
          this.count ++;
        }


      }
    )

  }

  getTenderDetails(tenderId: number){
    this.router.navigate(['/admin','tenders',tenderId,'company']);
  }

}
