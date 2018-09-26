import { GetCompaniesService } from '../../services/get-companies/get-companies.service';
import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-offer-platform',
  templateUrl: './offer-platform.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./offer-platform.component.scss']
})
export class OfferPlatformComponent implements OnInit {
  companiesInfo: Object[];
  UserData: Object;
  companiesView: Object[];
  isLogged = false;

  AreaCities = [];
  Areas = [];
  currentArea = "All";
  currentCities;
  currentCity = "All";
  categories = [];
  filter_category = "All";
  fiter_with_offers = "All";
  filter_follow = "All";

  constructor(private http: Http, private Companies: GetCompaniesService) {
    window.scrollTo(0, 0);

  }
  // get all companies

  ngOnInit(): void {
    if (localStorage.getItem('@MYUSER')) {
      this.isLogged = true;
      let user = localStorage.getItem('@MYUSER');
      this.UserData = JSON.parse(user);
      this.Companies.getMyCompanies(this.UserData['login_id']).subscribe(
        (Companies) => {
          this.companiesInfo = Companies['companies'];
          this.companiesView = this.companiesInfo;
        },
        (error) => {
          console.log('checking login - server maybe down')
        }
      );
    }
    else {
      this.Companies.getAllCompanies().subscribe(
        (Companies) => {
          this.companiesInfo = Companies['companies'];
          this.companiesView = this.companiesInfo;
        },
        (error) => {
          console.log('getting companies - server maybe down')
        }
      );
    }

    this.areaCitySelectData();
    this.getCompanyCategories();

    //console.log(this.companiesView);
  }

  followCompany(organization_id) {
    let follower_id = this.UserData['login_id'];
    this.Companies.followCompany(organization_id, follower_id)
      .subscribe(
        (response) => {
          if (response['status'] == 200) {
            console.log('Follow Worked');

            location.reload();
          }
          else {
            console.log('Follow Fail');
          }
        }
      );

  }
  unfollowCompany(organization_id) {
    let follower_id = this.UserData['login_id'];
    this.Companies.unfollowCompany(organization_id, follower_id)
      .subscribe(
        (response) => {
          if (response['status'] == 200) {
            console.log('Unfollow Worked');

            location.reload();
          }
          else {
            console.log('unfollow Fail');
          }
        }
      );
  }


  areaCitySelectData() {
    this.Companies.getAreaCities().subscribe(
      response => {
        for (let area of response['schools']) {
          let cities = [];
          let haveCites = true;
          for (let city of area['categories']) {
            if (city == null) {
              haveCites = false;
              break;
            }
            let city_name: string = city['cityName'];
            cities.push(city_name);

          }
          if (haveCites) {
            let area_name: string = area['areaName'];
            this.AreaCities[area_name] = cities;
            this.Areas.push(area_name);
          }
        }
        this.currentArea = "All";
        this.currentCity = "All";


      },
      error => {
        console.log("Something Went wrong [[Area and cities]]");
      }
    );
  }
  setNewCities() {
    if (this.currentArea == "All") {
      let empty_array = [];
      this.currentCities = empty_array;
      this.currentCity = "All";
    }
    else {
      this.currentCities = this.AreaCities[this.currentArea];
      this.currentCity = "All";
    }

  }
  getCompanyCategories() {
    this.Companies.getCategories().subscribe(
      response => {
        if (response[0]['category_id']) {
          for (let category of response) {
            this.categories.push(category['category_name']);
          }
        }
        else
          console.log("response => Something Went wrong [[Get Companies categories]]");

      },
      error => {
        console.log("error =>Something Went wrong [[Get Companies categories]]");
      }
    );
  }
  filterChoice() {
    if (
      this.currentArea == "All" &&
      this.currentCity == "All" &&
      this.filter_category == "All" &&
      this.fiter_with_offers == "All" &&
      this.filter_follow == "All"
    ) {
      this.resetView();
    }
    else {
      let current_view = this.companiesInfo;
      if (this.fiter_with_offers != "All") {
        current_view = this.haveOffersOnly(current_view);
        
      }

      if (this.filter_category != "All") {
        current_view = this.companieswithCategory(current_view);

      }

      if (this.filter_follow != "All") {
        current_view = this.followedOnly(current_view);

      }

      if (this.currentArea != "All") {
        current_view = this.getWithAreaCity(current_view);

      }


      this.companiesView = current_view;

    }
  }
  getWithAreaCity(current_view): Object[]{
    let getWithAreaCity: Object[] = [];
    for (let company of current_view) {
      if (company['area'] == this.currentArea) {
        if(this.currentCity == "All"){
          getWithAreaCity.push(company);
        }
        else{
          if(company['city'] == this.currentCity){
            getWithAreaCity.push(company);
          }
        }
        
      }
    }
    return getWithAreaCity;
  }
  haveOffersOnly(current_view): Object[] {
    let haveOffersOnly: Object[] = [];
    for (let company of current_view) {
      if (company['orderCount'] > 0) {
        haveOffersOnly.push(company);
      }
    }
    return haveOffersOnly;
  }
  followedOnly(current_view): Object[] {
    let followedOnly: Object[] = [];
    for (let company of current_view) {
      if (company['is_follow'] == 1) {
        followedOnly.push(company);
      }
    }
    return followedOnly;
  }
  companieswithCategory(current_view): Object[] {
    let cat_only: Object[] = [];
    for (let company of current_view) {
      let found_flag = false;
      for (let category of company['categories']) {
        if (category['category_name'] == this.filter_category) {
          found_flag = true;
          break;
        }

      }
      if (found_flag) {
        cat_only.push(company);
      }
    }
    return cat_only;
  }

  resetView(): Object[] {
    this.companiesView = this.companiesInfo;
    return this.companiesView;
  }

}



