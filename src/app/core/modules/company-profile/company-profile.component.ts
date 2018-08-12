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
  companyInfo
  categoryDesc
  followersCount
  offers

  constructor(private route: ActivatedRoute, private profileService : ProfileService,
    private getCompaniesService: GetCompaniesService, private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.getCompaniesService.getCompany(this.id).subscribe(
      (res: { model: CompaniesInfo[] }) => {
        this.companyInfo = res.model[0];
        
        this.profileService.getCategory(this.companyInfo.company_category_id).subscribe(
          (res: { category_name: any }) => {
            this.categoryDesc = res.category_name;
          },
          (error) => {
            console.log('errors ', error)
          }
        );
      },
      (error) => {
        console.log('errors ', error)
      }
    );

    this.profileService.getFollowers(this.id).subscribe(
      (res: { model: any[] }) => {
        // console.log("followers" + res.model[0].length)
        this.followersCount = res.model.length;
      },
      (error) => {
        console.log('errors ', error)
      }
    );
  
    this.profileService.getOffers(this.id).subscribe(
      (res: { list: any[] }) => {
        console.log("offers" + res.list.length);
        this.offers = res.list;
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
