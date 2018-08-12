import { Component, OnInit } from "../../../../../../node_modules/@angular/core";
import { FormGroup, FormControl, Validators } from "../../../../../../node_modules/@angular/forms";
import { CompanyNewOfferModel } from "../../../models/company.offer.new.model";
import { CompanyService } from "../../../services/company.service";
import { ActivatedRoute, Router, Params, Data } from "../../../../../../node_modules/@angular/router";


@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit {
  editOffer: FormGroup;
  offerId: number;

  offer: CompanyNewOfferModel;

  base64textString = [];
  hash = [];

  constructor(private companyService: CompanyService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.editOffer = new FormGroup({
      'offerName' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'cost' : new FormControl(null, Validators.required),
      'count' : new FormControl(null, Validators.required),
      // 'availableInDays' : new FormControl(null, Validators.required),
      'image_one' : new FormControl(null, Validators.required)
    });
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.offerId = +params['id'];
      }
    );
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.offer = data['offer'].model;
        console.log("Incoming offer: " + this.offer)
        this.base64textString[0] = 'data:image/png;base64,' + this.offer.image_one;
        this.base64textString[1] = 'data:image/png;base64,' + this.offer.image_two;
        this.base64textString[2] = 'data:image/png;base64,' + this.offer.image_third;
        this.base64textString[3] = 'data:image/png;base64,' + this.offer.image_four;
        console.log("Image one path is: " + this.base64textString)
        this.editOffer = new FormGroup({
          'offerName' : new FormControl(this.offer.offer_title, Validators.required),
          'description' : new FormControl(this.offer.offer_explaination, Validators.required),
          'cost': new FormControl(this.offer.offer_cost, Validators.required),
          'count': new FormControl(this.offer.offer_count, Validators.required),
          // 'image_one': new FormControl(this.offer.image_one, Validators.required)
        });
      }
    );
console.log("Incoming offer is: " + this.offer);
    console.log("Image hash is :" + this.base64textString)
  }


  onSubmit(){

    let data = {
      offer_id : this.offerId ,
      image_one: this.offer.image_one,
      image_two: this.offer.image_two,
      image_third: this.offer.image_third,
      image_four: this.offer.image_four,
      offer_title: this.editOffer.get('offerName').value,
      offer_explaination: this.editOffer.get('description').value,
      offer_cost: this.editOffer.get('cost').value,
      company_id: 6,
      offer_count: this.editOffer.get('count').value,
      offer_display_date:Date.now(),
    	offer_expired_date:Date.now(),
    	offer_deliver_date:Date.now()
    }

    console.log("Image 1: " + this.editOffer.get('image_one'))

    this.companyService.update(data).subscribe(
      response => {
         console.log("Successful edit");
         console.log(response);
         this.router.navigate(['/offers','see'])
        },
        err => console.log("Error: " + err)
    )
   
  }
}
