import { GetCompaniesService } from '../../services/get-companies/get-companies.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-offer-platform',
  templateUrl: './offer-platform.component.html',
  styleUrls: ['./offer-platform.component.scss']
})
export class OfferPlatformComponent implements OnInit {
  companiesInfo: Object;
  UserData:Object;
  
  isLogged=false;

  AreaCities=[];
  Areas = [];
  currentArea="All";
  currentCities;
  currentCity="All";
  categories=[];
  filter_category="All";
  fiter_with_offers="All";
  filter_follow="All";

  constructor(private http: Http, private Companies: GetCompaniesService) {
     window.scrollTo(0, 0);
    
  }
  // get all companies
  
  ngOnInit(): void {
  if(localStorage.getItem('@MYUSER')){
    this.isLogged=true;
    let user = localStorage.getItem('@MYUSER');
    this.UserData = JSON.parse(user);
      this.Companies.getMyCompanies(this.UserData['login_id']).subscribe(
        (Companies) => {
          this.companiesInfo =Companies;  
        },
        (error) => {
          console.log('errors ', error)
        }
      );
  }
  else{
    this.Companies.getAllCompanies().subscribe(
      (Companies) => {
        this.companiesInfo =Companies;    
      },
      (error) => {
        console.log('errors ', error)
      }
    );
  }
  this.areaCitySelectData();
  this.getCompanyCategories();
  }
  
  followCompany(organization_id){
    let follower_id=this.UserData['login_id'];
    this.Companies.followCompany(organization_id,follower_id)
    .subscribe(
      (response) =>{
        if(response['status']==200){
          console.log('Follow Worked');

          location.reload();
        }
        else{
          console.log('Follow Fail');
        }
      }
    );
    
  }
  unfollowCompany(organization_id){
    let follower_id=this.UserData['login_id'];
    this.Companies.unfollowCompany(organization_id,follower_id)
    .subscribe(
      (response) =>{
        if(response['status']==200){
          console.log('Unfollow Worked');

          location.reload();
        }
        else{
          console.log('unfollow Fail');
        }
      }
    );
  }


  areaCitySelectData(){
    this.Companies.getAreaCities().subscribe(
      response =>{
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
        this.currentArea="All";
        this.currentCity="All";
        
        
      },
      error =>{
        console.log("Something Went wrong [[Area and cities]]");
      }
    );
  }
  setNewCities(){
    if(this.currentArea == "All"){
      let empty_array=[];
      this.currentCities=empty_array;
      this.currentCity="All";
    }
    else{
      this.currentCities=this.AreaCities[this.currentArea];
      this.currentCity="All";
    }
    
  }
  getCompanyCategories(){
    this.Companies.getCategories().subscribe(
    response =>{
      if(response[0]['category_id']){
        for (let category of response){
          this.categories.push(category['category_name']);
        }
      }
      else 
      console.log("response => Something Went wrong [[Get Companies categories]]");

    },
    error =>{
      console.log("error =>Something Went wrong [[Get Companies categories]]");
    }
    );
  }
  filterChoice(){

  }
 
}



