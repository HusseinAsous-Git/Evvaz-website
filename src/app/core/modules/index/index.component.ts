import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {window.scrollTo(0, 0); }

  ngOnInit() {
    if (localStorage.getItem("@MYUSER")) {
      this.router.navigate(['/home-page']);
    }
  }

}
