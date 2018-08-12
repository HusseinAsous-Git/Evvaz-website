
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

  ngOnInit() {
    this.schoolService.getOrders(6).subscribe(
      
      response =>{ 
        
        console.log(response);
        this.schoolOrders = response;
        for(let order of this.schoolOrders){
          this.count++;
        }
        console.log(this.schoolOrders)
       }
    )
  }

}
