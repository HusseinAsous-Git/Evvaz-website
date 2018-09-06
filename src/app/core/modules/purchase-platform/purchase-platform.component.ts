import {CategoryDetails} from '../../models/purchase-category-details.model';
import { PurchasePlatformService } from '../../services/purchase-platform/purchase-platform.service';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-purchase-platform',
  templateUrl: './purchase-platform.component.html',
  styleUrls: ['./purchase-platform.component.scss']
})
export class PurchasePlatformComponent implements OnInit {
  categories:CategoryDetails[];
  islogged=false;
  
  constructor(private http: Http, private purchasPlatform: PurchasePlatformService) {window.scrollTo(0, 0); }

  ngOnInit() {
    if(localStorage.getItem('@MYUSER')){
      this.islogged=true;
    }
    
    this.purchasPlatform.getCategories().subscribe(
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
