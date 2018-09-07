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

  success_flag:boolean=false;
  fail_flag:boolean=false;
  constructor(private router: Router, private signUpService: SignUpService) {window.scrollTo(0, 0); }
  resolved;
  ngOnInit() {
    // if (localStorage.getItem("@MYUSER")) {
    //   this.router.navigate(['/home-page']);
    // }
  }

  signUp(): void {
    //console.log(this.user)
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
}