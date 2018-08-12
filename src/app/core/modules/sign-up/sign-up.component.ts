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
  }

  constructor(private router: Router, private signUpService: SignUpService) { }

  ngOnInit() {}

  signUp(): void {
    console.log(this.user)
    this.signUpService.signUp(this.user).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['']);
      }, error => {
        console.log(error);
      });
  }
}