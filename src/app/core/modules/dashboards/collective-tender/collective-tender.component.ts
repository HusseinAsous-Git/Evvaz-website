import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { SchoolService } from './../../../services/school.service';
import { SchoolTenderResolverModel } from './../../../models/school.tender.resolver.model';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-collective-tender',
  templateUrl: './collective-tender.component.html',
  styleUrls: ['./collective-tender.component.scss']
})
export class CollectiveTenderComponent implements OnInit {
  loginId: number;
  currentUser;
  date:Date;
  progress: number;
tenderId: number;
tender:SchoolTenderResolverModel ;
displayForm : boolean = true;
enableErrMessage = false;
errMessage;
enableSuccessMessage = false;
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private schoolService: SchoolService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    this.date = new Date();

    

 

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tenderId = +params['tenderId'];
        console.log("Tender id: " + this.tenderId)

      }
    );
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.tender = data['tender'];
        
        var display_date = new Date(this.tender.data.tender_display_date);
        console.log("Display date: " + display_date)
        
        var expire_date = new Date(this.tender.data.tender_expire_date);
        console.log("Expire date: " + expire_date) 


        var diffDate = expire_date.getTime() - display_date.getTime() ;

        var currentDate =expire_date.getTime() - new Date().getTime();

        

         this.progress = currentDate / diffDate;

        
         console.log("Progress: " + Math.floor(this.progress)*100)

         if(new Date().getTime()>expire_date.getTime()){
          this.progress = 100;
        }
        console.log(this.tender)
        


        

    }
    );


    
  }

  request(form:NgForm){
    console.log(form)
   var catData : {cat_name: string, count : number} []  = [];

   for(let cat of this.tender.categories){
    // console.log("cat name: " + cat.category_name)
    
    console.log("Cat is : " +cat.category_name + " has count: " +   form.value[cat.category_name]);
     catData.push({cat_name: cat.category_name, count: form.value[cat.category_name]})
      }


   

    let data = {
      request_school_id: this.loginId,
      request_tender_id: this.tenderId,
      is_aproved:0,
      t_date: new Date().getTime(),
      category: catData
    }
  
    this.schoolService.addCollectiveTender(data).subscribe(
      response => {
        this.enableSuccessMessage = true;
        this.displayForm = false;
        console.log(response)
        if(response['state'] !== 400){
          this.displayForm = false;
          setTimeout(()=> {
            this.router.navigate(['/school','collective','all'])
          },1500)
        }

      },
      err => {
        this.enableErrMessage = true;
        this.displayForm = false;
        this.errMessage = err.error.message+"!";
        console.log(err.error.message)
      }
    )

    
  }




}
