import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CompanyNewOfferModel } from "../../../models/company.offer.new.model";
import { CompanyService } from "../../../services/company.service";
import { ActivatedRoute, Router, Params, Data } from "@angular/router";
import { AmazingTimePickerService } from "../../../../../../node_modules/amazing-time-picker";


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

  loginId: number;
  currentUser;
  @ViewChild("startTime") startTime: ElementRef;
  @ViewChild("endTime") endTime: ElementRef;
  constructor(private companyService: CompanyService, private activatedRoute:ActivatedRoute, private router:Router,private atp : AmazingTimePickerService) { }

  ngOnInit() {


    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
console.log("Login ID: " + this.loginId)
    this.editOffer = new FormGroup({
      'offerName' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'cost' : new FormControl(null, Validators.required),
      'count' : new FormControl(null, Validators.required),
      'fromdate':new FormControl(null, Validators.required), 
      'startTime':new FormControl(null, Validators.required),
      'todate':new FormControl(null, Validators.required),
      'endTime':new FormControl(null, Validators.required),
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
          'fromdate':new FormControl(null, Validators.required), 
      'startTime':new FormControl(null, Validators.required),
      'todate':new FormControl(null, Validators.required),
      'endTime':new FormControl(null, Validators.required),
          'count': new FormControl(this.offer.offer_count, Validators.required),
          // 'image_one': new FormControl(this.offer.image_one, Validators.required)
        });
      }
    );
console.log("Incoming offer is: " + this.offer);
    console.log("Image hash is :" + this.base64textString)
  }


  setStartTime() {
    
    const amazingTimePicker = this.atp.open(
      {
        theme: 'light',  // Default: 'light'
           // Default: 'en'
        arrowStyle: {
            background: '#00b7cb',
            color: 'white'
        }
    }
    );
    amazingTimePicker.afterClose().subscribe(time => {
      this.editOffer.controls['startTime'].setValue(time) ;
      this.editOffer.controls['endTime'].setValue(this.endTime.nativeElement.value) ; 
             });


}

setEndTime() {
  const amazingTimePicker = this.atp.open(
    {
      theme: 'light',  // Default: 'light'
      arrowStyle: {
          background: '#00b7cb',
          color: 'white'
      }
  }
  );
  amazingTimePicker.afterClose().subscribe(time => {
    this.editOffer.controls['endTime'].setValue(time) ;
    this.editOffer.controls['startTime'].setValue(this.startTime.nativeElement.value) ;
           });
}


  onSubmit(){
    const fromDate = new Date(this.editOffer.get('fromdate').value +  " " + this.editOffer.get('startTime').value);
    const toDate = new Date(this.editOffer.get('todate').value +  " " + this.editOffer.get('endTime').value);
    console.log(fromDate.getTime() + "is of type: " + typeof(fromDate.getTime() ));
    console.log(toDate.getTime());
    console.log("String Hash: "+ this.hash);

    let data = {
      offer_id : this.offerId ,
      image_one: this.offer.image_one,
      image_two: this.offer.image_two,
      image_third: this.offer.image_third,
      image_four: this.offer.image_four,
      offer_title: this.editOffer.get('offerName').value,
      offer_explaination: this.editOffer.get('description').value,
      offer_cost: this.editOffer.get('cost').value,
      company_id: this.loginId,
      offer_count: this.editOffer.get('count').value,
      offer_display_date:fromDate.getTime(),
    	offer_expired_date:toDate.getTime(),
    	offer_deliver_date:Date.now()
    }

    console.log("Image 1: " + this.editOffer.get('image_one'))

    this.companyService.update(data).subscribe(
      response => { 
         console.log("Successful edit");
         console.log(response);
         this.router.navigate(['/company','offers','see'])
        },
        err => console.log("Error: " + err)
    )
   
  }
}
