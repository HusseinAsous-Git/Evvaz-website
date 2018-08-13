import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  id:Number;
  constructor(private route: ActivatedRoute, private router: Router,) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
   }

  ngOnInit() {
  }

}
