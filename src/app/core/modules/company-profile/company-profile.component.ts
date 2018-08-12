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
  id
  companyInfo:Object;
  categoryDesc
  followersCount
  offersList

  constructor(private route: ActivatedRoute, private profileService : ProfileService,
    private Company: GetCompaniesService, private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.Company.getCompany(this.id).subscribe(
      (Company) => {
        this.companyInfo =Company;  
        console.log(this.companyInfo);     
      },
      (error) => {
        console.log('errors ', error)
      }
    );

    // this.profileService.getFollowers(this.id).subscribe(
    //   (res: { model: any[] }) => {
    //     console.log("followers" + res.model[0].length)
    //     this.followersCount = res.model.length;
    //   },
    //   (error) => {
    //     console.log('errors ', error)
    //   }
    // );
  
    this.profileService.getOffers(this.id).subscribe(
      // (res: { list: any[] }) => {
      //   console.log("offers" + res.list.length);
      //   this.offers = res.list;
      // },
      (offers) => {
        this.offersList =offers['list'];  
        console.log(this.offersList);     
      },
      (error) => {
        console.log('errors ', error)
      }
    );
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + url);
  }
}
