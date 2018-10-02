import { AuthService } from '../../../services/auth.service';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { CompanyNewOfferModel } from '../../../models/company.offer.new.model';
import { AmazingTimePickerService } from '../../../../../../node_modules/amazing-time-picker';
import { SignUpService } from '../../../services/sign-up.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent implements OnInit {
  enableErrMsg = false;
  base64textString = [];
hash = [];
  newOffer: FormGroup;
  sizeArray  =  [];
  size;
  sizeIsValid: boolean  = true;
  currentUser ;
  loginId : number;
  @ViewChild("startTime") startTime: ElementRef;
  @ViewChild("endTime") endTime: ElementRef;

  AreaCities=[];
  Areas = [];
  currentArea;
  currentCities;
  currentCity;


   constructor(private companyService: CompanyService, 
    private router: Router,
     private authService: AuthService,
     private atp : AmazingTimePickerService,
     private signUpService: SignUpService) { }

  ngOnInit() {
this.areaCitySelectData();  
    this.currentUser = localStorage.getItem("@MYUSER");
    let currentUserData= JSON.parse(this.currentUser);
    this.loginId = currentUserData['login_id'];
 //   console.log("Current UserID: " + currentUserData['login_id'])


    this.newOffer = new FormGroup({
      'offerName' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'cost' : new FormControl(null, Validators.required),
      'count' : new FormControl(null, Validators.required),
      'fromdate':new FormControl(null, Validators.required), 
      'startTime':new FormControl(null, Validators.required),
      'todate':new FormControl(null, Validators.required),
      'endTime':new FormControl(null, Validators.required),
      'image_one' : new FormControl(null, Validators.required),
      'currentArea' : new FormControl(null, Validators.required),
      'currentCity' : new FormControl(null, Validators.required)
    });
 //   console.log("Date is:  "+ Date.now()+ "is of type: "+ typeof(new Date()));

  }
  onAreaChange(){
    this.newOffer.controls['currentArea'].valueChanges.subscribe((value) => {
      console.log(value);
      this.currentCities=this.AreaCities[value];
      this.currentCity=this.currentCities[0];
     
     // console.log(this.currentCities)
    });
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
      this.newOffer.controls['startTime'].setValue(time) ;
      this.newOffer.controls['endTime'].setValue(this.endTime.nativeElement.value) ; 
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
    this.newOffer.controls['endTime'].setValue(time) ;
    this.newOffer.controls['startTime'].setValue(this.startTime.nativeElement.value) ;
           });
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


  areaCitySelectData(){
    this.signUpService.getAreaCities().subscribe(
      response =>{
        console.log(response)
        let firstAreaWithCityPassed = false;
        for (let area of response['schools']){
          let cities=[];
          let haveCites=true;
          for(let city of area['categories']){
            if (city==null){
              haveCites=false;
              break;
            }
            let city_name:string = city['cityName'];
            cities.push(city_name);
            
          }
          if(haveCites){
            
            if(!firstAreaWithCityPassed){
              this.currentArea=area['areaName'];
              this.currentCity=cities[0];
              firstAreaWithCityPassed=true;
            }

            let area_name:string = area['areaName'];
            this.AreaCities[area_name] =cities;
            this.Areas.push(area_name);
          }
        }
        this.currentCities=this.AreaCities[this.currentArea];
        //console.log("Cities in areas : ",this.AreaCities );
        
      },
      error =>{
        console.log("server => Something Went wrong [[area and cities]]");
      }
    );
  }
  setNewCities(){
    
  }



  onSubmit(){
    const fromDate = new Date(this.newOffer.get('fromdate').value +  " " + this.newOffer.get('startTime').value);
    const toDate = new Date(this.newOffer.get('todate').value +  " " + this.newOffer.get('endTime').value);
   // console.log(fromDate.getTime() + "is of type: " + typeof(fromDate.getTime() ));
   // console.log(toDate.getTime());
  //  console.log("String Hash: "+ this.hash);

    
    
    let offer : CompanyNewOfferModel  = {
      image_one: this.hash[0],
      image_two: this.hash[1],
      image_third: this.hash[2],
      image_four: this.hash[3],
      offer_title: this.newOffer.get('offerName').value,
      offer_explaination: this.newOffer.get('description').value,
      offer_cost: this.newOffer.get('cost').value,
      offer_count: this.newOffer.get('count').value,
      offer_display_date: fromDate.getTime(),
      offer_expired_date: toDate.getTime(),
      offer_deliver_date:Date.now(),
      company_id:this.loginId
    }

    // console.log("Offer Title: " + this.newOffer.get('offerName').value + " is of type ("+typeof(this.newOffer.get('offerName').value)+ ")");
    // console.log("Offer Explanation: " + this.newOffer.get('description').value + " is of type ("+typeof(this.newOffer.get('description').value)+ ")");
    // console.log("Offer Cost: " + this.newOffer.get('cost').value + " is of type ("+typeof(this.newOffer.get('cost').value)+ ")");
    // console.log("Offer Count: " + this.newOffer.get('count').value + " is of type ("+typeof(this.newOffer.get('count').value)+ ")");
    // console.log("date is:" + this.newOffer.get('display_date').value);
    
    // console.log("Image is of type : " + typeof(this.base64textString))
    
    for(let el of this.sizeArray){
    //  console.log("Size" + el);
    }

    if(fromDate.getTime() < Date.now() && toDate.getTime() < fromDate.getTime() ){
      this.enableErrMsg = true;
    }else {
      this.companyService.addOffer(offer).subscribe(
        (response) => {
      //    console.log("Response: " + response);
       //   console.log("size is: " + this.size + "is of type"+ typeof(this.size))
          
        //  console.log(this.newOffer)


        console.log(this.newOffer.get('currentArea').value)
        console.log(this.newOffer.get('currentCity').value)
          this.router.navigate(['/company/offers/see']);
        }
        ,err => {
          document.getElementById("openModalButton").click();
    
          console.log("ERROR IN new-offer COMPONENT")
          console.log(err)
        }
      );
    }

    

  

  }


}
