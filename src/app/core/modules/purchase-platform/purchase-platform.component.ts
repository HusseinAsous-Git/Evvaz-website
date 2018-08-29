import { PurchasePlatformService } from '../../services/purchase-platform/purchase-platform.service';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-purchase-platform',
  templateUrl: './purchase-platform.component.html',
  styleUrls: ['./purchase-platform.component.scss']
})
export class PurchasePlatformComponent implements OnInit {
  categories:Object;
  constructor(private http: Http, private purchasPlatform: PurchasePlatformService) { }

  ngOnInit() {
    this.purchasPlatform.getCategory().subscribe(
      (response) => {
        this.categories =response;  
        //console.log(this.companiesInfo);     
      },
      (error) => {
        console.log('errors ', error)
      }
    );
  }

}
