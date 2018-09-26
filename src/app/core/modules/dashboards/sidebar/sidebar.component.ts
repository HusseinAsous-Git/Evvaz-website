import { UIService } from '../../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { SchoolOrdersModel } from '../../../models/school.orders.model';
import { SchoolProfileModel } from '../../../models/school.profile.model';
import { SchoolService } from '../../../services/school.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  count: number = 0;
  orders: SchoolOrdersModel [];
  schools : SchoolProfileModel [] ;
  countFollowers = 0;
  currentUser;
  loginId : number;
  constructor(private schoolService: SchoolService, public uiService: UIService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    this.schoolService.getOrders(this.loginId).subscribe(
      
      response =>{ 
        
     //   console.log(response);
        this.orders = response;
        for(let order of this.orders){
          this.count++;
        }
     //   console.log(this.orders)
       }
    )
    this.schoolService.getSchools(3).subscribe(
        response => {
          this.schools = response;
          for(let school of this.schools) {
            this.countFollowers ++;
          }
        }
    )
  }

  toggleSidebar(){
  //  console.log("toggle")
    if(this.uiService.getSidebarStatus()){
   //   console.log(true);
      this.uiService.sidebarStatus = false ; 
    }
  }




}
