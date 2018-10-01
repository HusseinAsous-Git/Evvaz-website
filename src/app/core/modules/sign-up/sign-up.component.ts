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
    "registerationEmail":"",
    "registerationPassword":"",
    "registerationUsername":"",
    "registerationPhoneNumber":"",
    "registrationOrganizationName":"",
    "registrationAddressDesc":"",
    "registrationWebsiteUrl":"",
    "registrationIsActive": 0,
    "registrationRole":"school",
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

  //Google maps test
  // lat: number = 51.678418;
  // lng: number = 7.809007;


  constructor(private router: Router, private signUpService: SignUpService) {
    window.scrollTo(0, 0); 
    
  }
  ngOnInit() {
    if (localStorage.getItem("@MYUSER")) {
      this.router.navigate(['/home-page']);
    }

    this.areaCitySelectData();
    
  }
  resolved($event){
    //console.log($event);
  }
  signUp(): void {
    //console.log(this.user)
    this.user.area=this.currentArea;
    this.user.city=this.currentCity;
    this.signUpService.signUp(this.user).subscribe(
      data => {
        //console.log(data);
        if(data['status']==201){
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
      }, error => {
        //console.log(error);
        this.fail_flag=true;
        this.success_flag=false;
      });
  }

  areaCitySelectData(){
    this.signUpService.getAreaCities().subscribe(
      response =>{
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
    this.currentCities=this.AreaCities[this.currentArea];
    this.currentCity=this.currentCities[0];
  }
}