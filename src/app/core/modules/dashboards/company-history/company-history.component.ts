import { CompanyService } from './../../../services/company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-history',
  templateUrl: './company-history.component.html',
  styleUrls: ['./company-history.component.scss']
})
export class CompanyHistoryComponent implements OnInit {

  
  loginId: number;
  currentUser;
  public companyHistory  ;
  count = 0;
  constructor(private companyService: CompanyService) { }

  ngOnInit() {

    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    console.log("Login Id: "+ this.loginId)
    this.companyService.getHistory(this.loginId).subscribe(
      response => {
        this.companyHistory = response;
       // console.log(response);

        for(let h of this.companyHistory){
          this.count ++;
        }
      }
    )
  }

}
