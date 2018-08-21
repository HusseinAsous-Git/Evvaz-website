import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TenderCategoryModel } from '../../../models/tender.category.model';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { SchoolService } from '../../../services/school.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-new-tender',
  templateUrl: './admin-new-tender.component.html',
  styleUrls: ['./admin-new-tender.component.scss']
})
export class AdminNewTenderComponent implements OnInit {

  loginId: number;
currentUser;

  newTenderForm: FormGroup;
  categories : TenderCategoryModel [];

  @ViewChild("schoolstartTime") schoolStartTime: ElementRef;
  @ViewChild("schoolendTime") schoolEndTime: ElementRef;

  @ViewChild("companystartTime") companyStartTime: ElementRef;
  @ViewChild("companyendTime") companyEndTime: ElementRef;


  constructor( private atp : AmazingTimePickerService, private schoolService: SchoolService, private router:Router) { }

  ngOnInit() {

    this.schoolService.getCategories().subscribe(
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



newTender(){
  console.log(this.newTenderForm)

 const schoolfromDate = new Date(this.newTenderForm.get('schoolfromdate').value +  " " + this.newTenderForm.get('schoolstartTime').value);

 const schooltoDate = new Date(this.newTenderForm.get('schooltodate').value +  " " + this.newTenderForm.get('schoolendTime').value);

 const companyfromDate = new Date(this.newTenderForm.get('companyfromdate').value +  " " + this.newTenderForm.get('companystartTime').value);

 const companytoDate = new Date(this.newTenderForm.get('companytodate').value +  " " + this.newTenderForm.get('companyendTime').value);
 


 console.log(schoolfromDate.getTime() + "is of type: " + typeof(schoolfromDate.getTime() ));
 console.log(schooltoDate.getTime());





 // here i should pass the right data depending on the Endpoint



//  let data = {
//   request_title : this.newTenderForm.get('tenderName').value,
//   request_explaination: this.newTenderForm.get('description').value,
//   request_display_date: fromDate.getTime(),
//   request_expired_date: toDate.getTime(),
//   school_id: this.loginId,
//   request_category_id: this.newTenderForm.get('category').value
//  }

 console.log("Name is: " + this.newTenderForm.get('tenderName').value + " is of type: " + typeof(this.newTenderForm.get('tenderName').value))
 console.log(" description is: " + this.newTenderForm.get('description').value + " is of type: " + typeof(this.newTenderForm.get('description').value))
 console.log("from date is: "+ schoolfromDate.getTime() + " is of type: " + typeof(schoolfromDate.getTime()));
 console.log("to date is: "+ schooltoDate.getTime() + " is of type: " + typeof(schooltoDate.getTime()));
 console.log("Login ID: " + this.loginId);
 console.log("category is: " + this.newTenderForm.get('category').value + " is of type: " + typeof(this.newTenderForm.get('category').value))





//  this.schoolService.createTender(data).subscribe(
//   response => {
//     console.log(response)
//     this.router.navigate(['/school','tenders','mine']);
//   },err => console.log(err)
//  )





}




}
