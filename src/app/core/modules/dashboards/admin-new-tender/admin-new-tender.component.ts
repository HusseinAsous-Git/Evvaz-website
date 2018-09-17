import { AdminCategory } from './../../../models/admin.cat.model';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TenderCategoryModel } from '../../../models/tender.category.model';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-new-tender',
  templateUrl: './admin-new-tender.component.html',
  styleUrls: ['./admin-new-tender.component.scss']
})
export class AdminNewTenderComponent implements OnInit {
  returnedCats: AdminCategory [] = [];
  loginId: number;
  errMessage: string;
currentUser;
cats;
catsExist = false;
changeFlag = true;
  newTenderForm: FormGroup;
  categories : AdminCategory [];
 catNames : {category_name: string} [] = [];
  @ViewChild("schoolstartTime") schoolStartTime: ElementRef;
  @ViewChild("schoolendTime") schoolEndTime: ElementRef;

  @ViewChild("companystartTime") companyStartTime: ElementRef;
  @ViewChild("companyendTime") companyEndTime: ElementRef;


  constructor( private atp : AmazingTimePickerService, private adminService: AdminService, private router:Router) { }

  ngOnInit() {

    this.adminService.getCategories().subscribe(
      response => {console.log(response);
        this.categories = response; }

    )


    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    console.log("Login Id: " + this.loginId);

    this.newTenderForm = new FormGroup(
      {
        'tenderName' : new FormControl(null, Validators.required),
        'category' : new FormControl(null, Validators.required),
        'description':new FormControl(null, Validators.required),
        'schoolfromdate':new FormControl(null, Validators.required), 
        'schoolstartTime':new FormControl(null, Validators.required),
        'schooltodate':new FormControl(null, Validators.required),
        'schoolendTime':new FormControl(null, Validators.required),
        'companyfromdate':new FormControl(null, Validators.required), 
        'companystartTime':new FormControl(null, Validators.required),
        'companytodate':new FormControl(null, Validators.required),
        'companyendTime':new FormControl(null, Validators.required)
      }
    )

    


  }


  setSchoolStartTime() {
    
    const amazingTimePicker = this.atp.open(
      {
        theme: 'light',  // Default: 'light'
           // Default: 'en'
        arrowStyle: {
            background: '#00b7cb',
            color: 'white'
        }
    }
    );
    amazingTimePicker.afterClose().subscribe(time => {
      this.newTenderForm.controls['schoolstartTime'].setValue(time) ;
      this.newTenderForm.controls['schoolendTime'].setValue(this.schoolEndTime.nativeElement.value) ; 
             });


}

setSchoolEndTime() {
  const amazingTimePicker = this.atp.open(
    {
      theme: 'light',  // Default: 'light'
      arrowStyle: {
          background: '#00b7cb',
          color: 'white'
      }
  }
  );
  amazingTimePicker.afterClose().subscribe(time => {
    this.newTenderForm.controls['schoolendTime'].setValue(time) ;
    this.newTenderForm.controls['schoolstartTime'].setValue(this.schoolStartTime.nativeElement.value) ;
           });
}


setCompanyStartTime() {
    
  const amazingTimePicker = this.atp.open(
    {
      theme: 'light',  // Default: 'light'
         // Default: 'en'
      arrowStyle: {
          background: '#00b7cb',
          color: 'white'
      }
  }
  );
  amazingTimePicker.afterClose().subscribe(time => {
    this.newTenderForm.controls['companystartTime'].setValue(time) ;
    this.newTenderForm.controls['companyendTime'].setValue(this.companyEndTime.nativeElement.value) ; 
           });


}

setCompanyEndTime() {
const amazingTimePicker = this.atp.open(
  {
    theme: 'light',  // Default: 'light'
    arrowStyle: {
        background: '#00b7cb',
        color: 'white'
    }
}
);
amazingTimePicker.afterClose().subscribe(time => {
  this.newTenderForm.controls['companyendTime'].setValue(time) ;
  this.newTenderForm.controls['companystartTime'].setValue(this.companyStartTime.nativeElement.value) ;
         });
}

hasChecked(e  ,category: AdminCategory, index: number){
  console.log(e.checked);
  console.log(category);




  if(e.target.checked){

    

    this.returnedCats.push(category)
   
  }
  else{
    this.returnedCats.splice(index, 1);
    
   }
  
 
}


newTender(){
  console.log(this.newTenderForm)

 const schoolfromDate = new Date(this.newTenderForm.get('schoolfromdate').value +  " " + this.newTenderForm.get('schoolstartTime').value);

 const schooltoDate = new Date(this.newTenderForm.get('schooltodate').value +  " " + this.newTenderForm.get('schoolendTime').value);

 const companyfromDate = new Date(this.newTenderForm.get('companyfromdate').value +  " " + this.newTenderForm.get('companystartTime').value);

 const companytoDate = new Date(this.newTenderForm.get('companytodate').value +  " " + this.newTenderForm.get('companyendTime').value);
 
 for(let c of this.returnedCats){
   this.catNames.push({category_name: c.category_name});
  console.log("Retuen cat: " + c.category_name)
}

 console.log(schoolfromDate.getTime() + "is of type: " + typeof(schoolfromDate.getTime() ));
 console.log(schooltoDate.getTime());





 // here i should pass the right data depending on the Endpoint



 let data = {
  tender_logo : null,
  tender_explain: this.newTenderForm.get('description').value,
  tender_title: this.newTenderForm.get('tenderName').value,
  tender_display_date: schoolfromDate.getTime(),
  tender_expire_date: schooltoDate.getTime(),
  tender_company_display_date: companyfromDate.getTime(),
  tender_company_expired_date: companytoDate.getTime(),
  cats: this.catNames
 }

 console.log("Name is: " + this.newTenderForm.get('tenderName').value + " is of type: " + typeof(this.newTenderForm.get('tenderName').value))
 console.log(" description is: " + this.newTenderForm.get('description').value + " is of type: " + typeof(this.newTenderForm.get('description').value))
 console.log("from date is: "+ schoolfromDate.getTime() + " is of type: " + typeof(schoolfromDate.getTime()));
 console.log("to date is: "+ schooltoDate.getTime() + " is of type: " + typeof(schooltoDate.getTime()));
 console.log("Login ID: " + this.loginId);



 





 this.adminService.createTender(data).subscribe(
  response => {
    console.log(response)
    this.router.navigate(['/admin','tenders','mine']);
      
  },err  =>  {
    this.errMessage = err.error.message;
    if( err.error.cats) {
      this.catsExist = true;
      this.cats = err.error.cats;
    }
    
    document.getElementById("openModalButton").click();

    console.log(err)}
 )





}




}
