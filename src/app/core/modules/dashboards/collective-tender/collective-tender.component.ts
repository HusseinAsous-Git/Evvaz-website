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
enableupdateMessage = false;
catExist = false;
progressPercentage =0;
progressStatus;
expird= false;
allCats;
postponed = false;
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private schoolService: SchoolService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    this.date = new Date();

    

 

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tenderId = +params['tenderId'];
     //   console.log("Tender id: " + this.tenderId)

      }
    );
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.tender = data['tender'];
     //   console.log("Tender: ");
      //  console.log(this.tender)
        this.allCats = this.tender.data['category'];
        // var display_date = new Date(this.tender.data.tender_display_date);
        // console.log("Display date: " + display_date)
        
        // var expire_date = new Date(this.tender.data.tender_expire_date);
        // console.log("Expire date: " + expire_date) 


        // var diffDate = expire_date.getTime() - display_date.getTime() ;

        // var currentDate =expire_date.getTime() - new Date().getTime();

        

        //  this.progress = currentDate / diffDate;

        
        //  console.log("Progress: " + Math.floor(this.progress)*100)

        //  if(new Date().getTime()>expire_date.getTime()){
        //   this.progress = 100;
        // }
        

        var percentage = this.tender.data.tender_expire_date - this.tender.data.tender_display_date;

      //  console.log("Percentage: " + percentage)
        var diff = this.tender.data.tender_expire_date - new Date().getTime();
        var division = diff / percentage;
      //  console.log("Division: " + division)
        this.progressPercentage = 100 - (Math.floor( division * 100));  
     //   console.log("Progress:"+ this.progressPercentage)
        this.progressStatus = "Available";
        if(this.tender.data.tender_display_date > Date.now()) {
          this.progressPercentage = 0 ;
          this.progressStatus = "Postponed";
          
        }else{
          if (division <0 || this.progressPercentage<0){
            this.progressPercentage = 100 ;
            this.progressStatus = "Expired";
          }
        }
    
      //  console.log("Difference between two dates: " + this.progressPercentage )

        


      //  console.log(this.tender)
        


        

    }
    );


    
  }

  request(form:NgForm){

    if(this.progressStatus === "Expired"){
      this.expird = true;
      this.displayForm = false;
      return ;
    }
    if(this.progressStatus === "Postponed"){
      this.expird = false;
      this.displayForm = false;
      this.postponed = true;
      return ;
    }
  //  console.log(form)
   var catData : {cat_name: string, count : number} []  = [];

   for(let cat of this.tender.data['category']){
    // console.log("cat name: " + cat.category_name)
    if(cat['count'] !== 0) {
      this.catExist = true;
    }
   // console.log("Cat is : " +cat.category_name + " has count: " +   form.value[cat.category_name]);
     catData.push({cat_name: cat.category_name, count: form.value[cat.category_name]})
      }


   

    let dataCreate = {
      request_school_id: this.loginId,
      request_tender_id: this.tenderId,
      is_aproved:0,
      t_date: new Date().getTime(),
      category: catData
    }
  

    
    let data = {
      request_school_id: this.loginId,
      request_tender_id: this.tenderId,
      category: catData
    }

   // console.log(data)
    // if(!this.catExist){

    this.schoolService.addCollectiveTender(dataCreate).subscribe(
      response => {
        this.enableSuccessMessage = true;
        this.displayForm = false;
        setTimeout(()=> {
          this.enableSuccessMessage = false;
          this.displayForm = true;
        },2000)
      //  console.log(response)
        if(response['state'] !== 400){
          this.displayForm = false;
          // setTimeout(()=> {
          //   this.router.navigate(['/school','collective','all'])
          // },1500)
        }

      },
      err => {
        this.enableErrMessage = true;
        this.displayForm = false;
      //  console.log(dataCreate)
      //  console.log(err.error.message)
      }
    )
  // }else {
    
    // this.schoolService.updateCategoty(data).subscribe(
    //   response => {
    //     this.enableupdateMessage = true;
    //     this.displayForm = false;
    //     setTimeout(()=> {
    //       this.enableupdateMessage = false;
    //       this.displayForm = true;
    //     },2000)
    //     console.log(response)
    //     if(response['state'] !== 400){
    //       this.displayForm = false;
    //       // setTimeout(()=> {
    //       //   this.router.navigate(['/school','collective','all'])
    //       // },1500)
    //     }

    //   },
    //   err => {
    //     this.enableErrMessage = true;
    //     this.displayForm = false;
       
    //     console.log(data)
    //   }
    // )
  // }

    
  }




}
