import { SchoolTenderModel } from './../../../models/school.tender.model';
import { SchoolService } from './../../../services/school.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-all-collective-tenders',
  templateUrl: './all-collective-tenders.component.html',
  styleUrls: ['./all-collective-tenders.component.scss']
})
export class AllCollectiveTendersComponent implements OnInit {

  allCollectiveTenders : SchoolTenderModel [];
  collectiveCount = 0;
  constructor(private router:Router, private schoolService:SchoolService) { }

  ngOnInit() {
    this.
    schoolService.getAllCollectiveTenders().subscribe(
      response => {
        console.log(response);
        this.allCollectiveTenders = response;
        for(let c of this.allCollectiveTenders){
          var oneDay = 24*60*60*1000;
          var currentDate = new Date();
          c.dayLeft = Math.round(Math.abs((c.tender_expire_date -currentDate.getTime())/(oneDay)));

          this.collectiveCount ++;
        }
      },
      err => console.log(err)
    )

    
  }


  getTenderDetails(tenderId: number){
    this.router.navigate(['/school','tender',tenderId,'collective']);
  }


  getAllCollectiveTenders(){
   
  }
}
