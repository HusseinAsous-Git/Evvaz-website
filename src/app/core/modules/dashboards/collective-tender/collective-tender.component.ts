import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SchoolService } from './../../../services/school.service';
import { SchoolTenderResolverModel } from './../../../models/school.tender.resolver.model';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collective-tender',
  templateUrl: './collective-tender.component.html',
  styleUrls: ['./collective-tender.component.scss']
})
export class CollectiveTenderComponent implements OnInit {
  loginId: number;
  currentUser;
  date:Date;
tenderId: number;
tender:SchoolTenderResolverModel ;
newRequest : FormGroup;
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private schoolService: SchoolService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    this.date = new Date();

    this.newRequest = new FormGroup({});

  //  this.newTenderForm.controls['companyendTime'].setValue(this.companyEndTime.nativeElement.value) ; 

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tenderId = +params['tenderId'];
        console.log("Tender id: " + this.tenderId)
      }
    );
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.tender = data['tender'];
        console.log(this.tender)
        


        for(let cats of this.tender.categories){
          this.newRequest.setControl(cats.category_name,null)
       //  this.newRequest.controls[cats.category_name].setValue(null);
        }

    }
    );


    
  }

  request(){
    
    var catData : {cat_name: string, count : number} []  = [];

    for(let cat of this.tender.categories){
//console.log("cat name: " + cat.category_name)
     // console.log("Cat is : " +cat.category_name + " has count: " +  this.newRequest.get(cat.category_name).value);
    //  catData.push({cat_name: cat.category_name, count: this.newRequest.get(cat.category_name).value})
        }


   

    let data = {
      request_school_id: this.loginId,
      request_tender_id: this.tenderId,
      is_aproved:0,
      t_date: new Date().getTime(),
      category: catData
    }
  
    this.schoolService.addCollectiveTender(data).subscribe(
      response => console.log(response)
    )


  }




}
