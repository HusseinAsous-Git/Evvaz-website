
import { Component, OnInit } from '@angular/core';
import { SchoolHistoryModel } from '../../../models/school.history.model';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-school-orders-history',
  templateUrl: './school-orders-history.component.html',
  styleUrls: ['./school-orders-history.component.css']
})
export class SchoolOrdersHistoryComponent implements OnInit {

  loginId: number;
  currentUser;
  public schoolHistory : SchoolHistoryModel [];
  count = 0;
  constructor(private schoolService: SchoolService) { }

  ngOnInit() {

    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    //console.log("Login Id: "+ this.loginId)
    this.schoolService.getHistory(this.loginId).subscribe(
      response => {
        this.schoolHistory = response;
       // console.log(response);

        for(let h of this.schoolHistory){
          this.count ++;
        }
      }
    )
  }

}
