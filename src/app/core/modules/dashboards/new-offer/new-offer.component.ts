
import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '../../../../../../node_modules/@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { CompanyNewOfferModel } from '../../../models/company.offer.new.model';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent implements OnInit {

  base64textString = [];
hash = [];
  newOffer: FormGroup;
  sizeArray  =  [];
  size;
  sizeIsValid: boolean  = true;
   constructor(private companyService: CompanyService, private router: Router ) { }

  ngOnInit() {
    this.newOffer = new FormGroup({
      'offerName' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'cost' : new FormControl(null, Validators.required),
      'count' : new FormControl(null, Validators.required),
     
      'image_one' : new FormControl(null, Validators.required)
    });
    console.log("Date is:  "+ Date.now()+ "is of type: "+ typeof(new Date()));

  }


  

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    this.size = file.size;
    if (file) {
      const reader = new FileReader();


      if(this.size >1000000 ){
        this.sizeIsValid = false;
        }else{
          this.sizeIsValid = true;
        }

        if(this.sizeIsValid){
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
        }else{
          return ;
        }


    

    }
   
  }
  
  handleReaderLoaded(e) {
    this.hash.push( btoa(e.target.result));
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    // this.sizeArray.push(btoa(e.target.size));
  }




  onSubmit(){
    
    console.log("String Hash: "+ this.hash);

    
    
    let offer : CompanyNewOfferModel  = {
      image_one: this.hash[0],
      image_two: this.hash[1],
      image_third: this.hash[2],
      image_four: this.hash[3],
      offer_title: this.newOffer.get('offerName').value,
      offer_explaination: this.newOffer.get('description').value,
      offer_cost: this.newOffer.get('cost').value,
      offer_count: this.newOffer.get('count').value,
      offer_display_date:Date.now(),
      offer_expired_date:Date.now(),
      offer_deliver_date:Date.now(),
      company_id:6
    }

    // console.log("Offer Title: " + this.newOffer.get('offerName').value + " is of type ("+typeof(this.newOffer.get('offerName').value)+ ")");
    // console.log("Offer Explanation: " + this.newOffer.get('description').value + " is of type ("+typeof(this.newOffer.get('description').value)+ ")");
    // console.log("Offer Cost: " + this.newOffer.get('cost').value + " is of type ("+typeof(this.newOffer.get('cost').value)+ ")");
    // console.log("Offer Count: " + this.newOffer.get('count').value + " is of type ("+typeof(this.newOffer.get('count').value)+ ")");
    // console.log("date is:" + this.newOffer.get('display_date').value);
    
    // console.log("Image is of type : " + typeof(this.base64textString))
    
    for(let el of this.sizeArray){
      console.log("Size" + el);
    }

    this.companyService.addOffer(offer).subscribe(
      (response) => {
        console.log("Response: " + response);
        console.log("size is: " + this.size + "is of type"+ typeof(this.size))
        
        console.log(this.newOffer)
        this.router.navigate(['/home/offers/see']);
      }
      ,(err) => console.log(err)
    );

  

  }


}
