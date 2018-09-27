import { Router } from '@angular/router';
import { SchoolService } from '../../../services/school.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { TenderCategoryModel } from '../../../models/tender.category.model';
@Component({
  selector: 'app-new-tender',
  templateUrl: './new-tender.component.html',
  styleUrls: ['./new-tender.component.scss']
})
export class NewTenderComponent implements OnInit {
 
  base64textString;
  loginId: number;
currentUser;
categoryName;
  newTenderForm: FormGroup;
  categories : TenderCategoryModel [];
  size;
  hash;
  sizeIsValid: boolean  = true;
  @ViewChild("startTime") startTime: ElementRef;
  @ViewChild("endTime") endTime: ElementRef;

  constructor( private atp : AmazingTimePickerService, private schoolService: SchoolService, private router:Router) { }

  ngOnInit() {

    this.schoolService.getCategories().subscribe(
      response => {
        //console.log(response);
        this.categories = response; }

    )


    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    //console.log("Login Id: " + this.loginId);

    this.newTenderForm = new FormGroup(
      {
        'tenderName' : new FormControl(null, Validators.required),
        'category' : new FormControl(null, Validators.required),
        'description':new FormControl(null, Validators.required),
        'fromdate':new FormControl(null, Validators.required), 
        'startTime':new FormControl(null, Validators.required),
        'todate':new FormControl(null, Validators.required),
        'endTime':new FormControl(null, Validators.required),
        'image_one' : new FormControl(null, Validators.required)
      }
    )

    


  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    this.size = file.size;
    if (file) {
      const reader = new FileReader();


      if(this.size >1000000 ){
        this.sizeIsValid = false;
        }else{
          this.sizeIsValid = true;
        }

        if(this.sizeIsValid){
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
        }else{
          return ;
        }


    

    }
   
  }
  
  handleReaderLoaded(e) {
    this.hash =  btoa(e.target.result);
    this.base64textString = 'data:image/png;base64,' + btoa(e.target.result);
    // this.sizeArray.push(btoa(e.target.size));
  }




  setStartTime() {
    
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
      this.newTenderForm.controls['startTime'].setValue(time) ;
      this.newTenderForm.controls['endTime'].setValue(this.endTime.nativeElement.value) ; 
             });


}

setEndTime() {
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
    this.newTenderForm.controls['endTime'].setValue(time) ;
    this.newTenderForm.controls['startTime'].setValue(this.startTime.nativeElement.value) ;
           });
}



newTender(){
  //  console.log(this.newTenderForm)
   const fromDate = new Date(this.newTenderForm.get('fromdate').value +  " " + this.newTenderForm.get('startTime').value);
   const toDate = new Date(this.newTenderForm.get('todate').value +  " " + this.newTenderForm.get('endTime').value);
  // console.log(fromDate.getTime() + "is of type: " + typeof(fromDate.getTime() ));
   //console.log(toDate.getTime());

   let data = {
    request_title : this.newTenderForm.get('tenderName').value,
    request_explaination: this.newTenderForm.get('description').value,
    request_display_date: fromDate.getTime(),
    request_expired_date: toDate.getTime(),
    school_id: this.loginId,
    image_one:this.hash,
    response_count: null,
    request_category_name: this.newTenderForm.get('category').value
   }

  // console.log("Name is: " + this.newTenderForm.get('tenderName').value + " is of type: " + typeof(this.newTenderForm.get('tenderName').value))
  // console.log(" description is: " + this.newTenderForm.get('description').value + " is of type: " + typeof(this.newTenderForm.get('description').value))
  // console.log("from date is: "+ fromDate.getTime() + " is of type: " + typeof(fromDate.getTime()));
  // console.log("to date is: "+ toDate.getTime() + " is of type: " + typeof(toDate.getTime()));
  // console.log("Login ID: " + this.loginId);
   //console.log("category is: " + this.newTenderForm.get('category').value + " is of type: " + typeof(this.newTenderForm.get('category').value))
  // console.log("Image is: " + this.hash[0]);
   this.schoolService.createTender(data).subscribe(
    response => {
     // console.log(response)
      this.router.navigate(['/school','tenders','mine']);
    },err => {
      document.getElementById("openModalButton").click();

      console.log("ERROR IN new-tender component");
    }
   )
  }

}
