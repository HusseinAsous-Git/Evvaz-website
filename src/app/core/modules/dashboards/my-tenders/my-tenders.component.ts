import { SchoolService } from '../../../services/school.service';
import { Component, OnInit } from '@angular/core';
import { SchoolOrdersModel } from '../../../models/school.orders.model';

@Component({
  selector: 'app-my-tenders',
  templateUrl: './my-tenders.component.html',
  styleUrls: ['./my-tenders.component.scss']
})
export class MyTendersComponent implements OnInit {

  
  loginId: number;
  currentUser;
  public schoolOrders : SchoolOrdersModel [];
  count = 0;
  constructor(private schoolService: SchoolService) { }

  ngOnInit() {

    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    console.log("Login id: " + this.loginId)
    this.schoolService.getSchoolOrders(this.loginId).subscribe(
      response => {
        
        console.log(response)
        this.schoolOrders = response;

        for(let o of this.schoolOrders){
          var oneDay = 24*60*60*1000;
          var currentDate = new Date();
          o.dayLeft = Math.round(Math.abs((o.request_expired_date -currentDate.getTime())/(oneDay)));

          this.count ++;
        }
        
       }

       
    )
  }






}
