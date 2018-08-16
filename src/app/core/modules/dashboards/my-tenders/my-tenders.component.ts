import { SchoolService } from '../../../services/school.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-tenders',
  templateUrl: './my-tenders.component.html',
  styleUrls: ['./my-tenders.component.scss']
})
export class MyTendersComponent implements OnInit {

  date : Date;
  loginId : number;
  currentUser;
  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.date = new Date();
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];

    this.schoolService.getTendersbySchoolId(this.loginId).subscribe(
      response => {
        console.log(response)
      }
    )
    

  }





}
