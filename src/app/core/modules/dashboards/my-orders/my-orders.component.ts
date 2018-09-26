
import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { SchoolOrdersModel } from '../../../models/school.orders.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor(private schoolService: SchoolService) { }
  public count: number =0;
  public schoolOrders: SchoolOrdersModel [];
  currentUser;
  applyMessage = false;
  loginId : number;
  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    this.schoolService.getOrders(this.loginId).subscribe(
      
      response =>{ 
        
       // console.log(response);
        this.schoolOrders = response;
        for(let order of this.schoolOrders){
          this.count++;
        }
        if(this.count === 0){
          this.applyMessage = true;
        }
      //  console.log(this.schoolOrders)
       }
    )
  }

}
