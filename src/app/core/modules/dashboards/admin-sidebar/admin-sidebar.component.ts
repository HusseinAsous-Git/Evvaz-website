import { UIService } from './../../../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private uiService:UIService) { }

  ngOnInit() {
  }


  // toggleSidebar(){
  //   console.log("toggle on sidebar")
  //   if(this.uiService.getSidebarStatus()){
  //     console.log(true);
  //     this.uiService.sidebarStatus = false ; 
  //   }
  // }



}
