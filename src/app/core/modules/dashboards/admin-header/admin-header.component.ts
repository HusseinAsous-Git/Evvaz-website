import { Router } from '@angular/router';
import { UIService } from './../../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private uiService:UIService, private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }
  toggleSidebar(){
    
      this.uiService.sidebarStatus = ! this.uiService.sidebarStatus; 
    
    console.log("toggled")
  }


  onLogout(){
    this.authService.logout();
    localStorage.removeItem('hisCount');
    this.router.navigate(['/']);

  }
}
