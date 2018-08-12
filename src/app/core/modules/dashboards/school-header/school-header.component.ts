
import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-school-header',
  templateUrl: './school-header.component.html',
  styleUrls: ['./school-header.component.css']
})
export class SchoolHeaderComponent implements OnInit {

  constructor(private schoolService: SchoolService) { }
name : string;
  ngOnInit() {

    this.schoolService.getProfile(4).subscribe(
      response => {
       this.name =  response.school_name;
      }
    )
  }

}
