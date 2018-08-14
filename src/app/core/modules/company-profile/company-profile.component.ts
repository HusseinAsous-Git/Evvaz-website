import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetCompaniesService } from '../../services/get-companies/get-companies.service';
import { CompaniesInfo } from '../../models/companies-info';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  id: Number;
  company:Object;
  followCount
  offersCount
  offers: Object;
  UserData: Object;
  checker
  flag
  constructor(private route: ActivatedRoute, private profileService : ProfileService,
    private Company$: GetCompaniesService, private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    let user = localStorage.getItem('@MYUSER');
  this.UserData = JSON.parse(user);
  console.log("this user id is ====> ",this.UserData['login_id'])
  }

  ngOnInit() {
  
    this.Company$.getCompany(this.id).subscribe(
      (Company) => {
        this.company =Company;  
        //console.log(this.company);     
      },
      (error) => {
        console.log('errors ', error)
      }
    );



    
    this.Company$.getCompanyFollowCount(this.id).subscribe(
      (count)=>{
        this.followCount = count;
      }
    );
    this.Company$.getCompanyOffersCount(this.id).subscribe(
      (count)=>{
        this.offersCount = count;
      }
    );
    this.profileService.getOffers(this.id).subscribe(
      (res: { list: any[] }) => {
        //console.log("offers" + res.list.length);
        this.offers = res.list;
      },
      // (offers) => {
      //   this.offers =offers;  
      //   //console.log("offers object : "+this.offers);     
      // },
      (error) => {
        console.log('errors ', error)
      }
    );
  }
  

  // isUserFollowingThisCompany(org_id){
  //   this.Company$.isFollowedCompany(org_id,this.UserData['login_id']).subscribe(
  //     (response)=>{
  //       this.flag=response;
  //       this.checker="done";
  //       //console.log(this.flag);
  //       //console.log(!this.flag);
  //       return this.flag;
  //     }
  //   );
  // }

  followCompany(org_id){
    
    this.Company$.followCompany(org_id,this.UserData['login_id'])
    .subscribe(
      (response) =>{
        if(response['status']==200){
          console.log('Follow Worked');
          this.flag=true;
          location.reload();
        }
        else{
          this.flag=false;
          console.log('Follow Fail');
        }
      }
    );
    
  }
  unfollowCompany(){
    
    this.Company$.unfollowCompany(this.company['company_id'],this.UserData['login_id'])
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


}
