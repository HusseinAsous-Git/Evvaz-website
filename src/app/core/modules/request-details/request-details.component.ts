import { Component, OnInit } from '@angular/core';
import { PurchasePlatformService } from '../../services/purchase-platform/purchase-platform.service';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  request_id:Number;
  constructor(private route: ActivatedRoute, private router: Router,private http: Http, private purchasPlatform: PurchasePlatformService) { 
    this.route.params.subscribe(params => {
      this.request_id = params['reqId'];
    });
  }

  ngOnInit() {
  }

}
