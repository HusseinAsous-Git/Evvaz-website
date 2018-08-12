import { ProfileServiceDashboard } from './../../../services/profile.service.dashboard';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-dash',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderDashboardComponent implements OnInit {
  name: string;
  constructor(private profileService: ProfileServiceDashboard) { }

  ngOnInit() {

    this.profileService.getProfile(6).subscribe(
      response => {
        console.log(response);
        this.name = response.company_name;
      }
    )
  }

}
