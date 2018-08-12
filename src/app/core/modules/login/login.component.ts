import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  user = {
    "user_email": "",
    "user_password": "",
    "login_role": "school"
  }

  constructor(private router: Router, private authService: AuthService) { }

  DoLogin(): void {
    this.authService.signIn(this.user).subscribe(
      data => {

        if(data['state'] === 201 ){

        this.authService.setUser(data);
        console.log(data);
        this.router.navigate(['home-page']);
        }
        else {
          this.router.navigate(['/']);

        }
       }
       //, error => {
      //   console.log(error);
      // }
    );
  }

  ngOnInit() {}
}
