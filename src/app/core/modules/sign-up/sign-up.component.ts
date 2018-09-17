import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})

export class SignUpComponent implements OnInit {
  confirm_password
  user = {
    "registeration_email":"",
    "registeration_password":"",
    "registeration_username":"",
    "registeration_phone_number":"",
    "registration_organization_name":"",
    "registration_address_desc":"",
    "registration_website_url":"",
    "registration_isActive": 0,
    "registration_role":"school",
    "city":"",
    "area":""
  }

  success_flag:boolean=false;
  fail_flag:boolean=false;


  AreaCities=[];
  Areas = [];
  currentArea;
  currentCities;
  currentCity;
  constructor(private router: Router, private signUpService: SignUpService) {
    window.scrollTo(0, 0); 
    
  }
  ngOnInit() {
    if (localStorage.getItem("@MYUSER")) {
      this.router.navigate(['/home-page']);
    }

    this.areaCitySelectData();
    
  }

  signUp(): void {
    //console.log(this.user)
    this.user.area=this.currentArea;
    this.user.city=this.currentCity;
    this.signUpService.signUp(this.user).subscribe(
      data => {
        //console.log(data);
        if(data['states']==201){
          this.success_flag=true;
          this.fail_flag=false;
          setTimeout(() => {
            this.router.navigate(['reigsteration-success']);
        }, 1400);
        }
        else{
          this.fail_flag=true;
          this.success_flag=false;
        }
        //console.log("");
        //this.router.navigate(['']);
      }, error => {
        //console.log(error);
        this.fail_flag=true;
        this.success_flag=false;
      });
  }
  areaCitySelectData(){
    this.signUpService.getAreaCities().subscribe(
      response =>{
        this.currentArea=response['schools'][0]['areaName'];
        this.currentCity=response['schools'][0]['categories'][0]['cityName'];
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
            let area_name:string = area['areaName'];
            this.AreaCities[area_name] =cities;
            this.Areas.push(area_name);
          }
        }
        this.currentCities=this.AreaCities[this.currentArea];
        //console.log("Cities in areas : ",this.AreaCities );
        
      },
      error =>{
        console.log("Something Went wrong [[cities]]");
      }
    );
  }
  setNewCities(){
    this.currentCities=this.AreaCities[this.currentArea];
    this.currentCity=this.currentCities[0];
    //console.log("current area", this.currentArea);
  }
}