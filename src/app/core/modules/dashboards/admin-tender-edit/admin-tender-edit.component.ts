import { Params } from '@angular/router';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AdminService } from './../../../services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AmazingTimePickerService } from '../../../../../../node_modules/amazing-time-picker';
import { AdminCategory } from '../../../models/admin.cat.model';

@Component({
  selector: 'app-admin-tender-edit',
  templateUrl: './admin-tender-edit.component.html',
  styleUrls: ['./admin-tender-edit.component.scss']
})
export class AdminTenderEditComponent implements OnInit {
  editTenderForm: FormGroup;
  loginId: number;
  currentUser;
  returnedCats: AdminCategory [] = [];
  catNames : {category_name: string} [] = [];
  categories:any;
  tender:any;
  cats:any;
  tenderId:number;
  errMessage: string;
  catsExist = false;
  @ViewChild("schoolstartTime") schoolStartTime: ElementRef;
  @ViewChild("schoolendTime") schoolEndTime: ElementRef;

  @ViewChild("companystartTime") companyStartTime: ElementRef;
  @ViewChild("companyendTime") companyEndTime: ElementRef;


  constructor(private atp : AmazingTimePickerService, private adminService:AdminService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      (params:Params) =>{
        this.tenderId = +params['tenderId'];
      }
    )

    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.tender = data['tender'];
        console.log(this.tender)
      //   for (let c of this.companies){
      //   c.company_logo_image = 'data:image/png;base64,' + c.company_logo_image;
       
      // }

this.cats = this.tender.category;
      for(let c of this.tender.category){
        c.school_logo_image = 'data:image/png;base64,' + c.school_logo_image;
      }


    }

    
    


    );



    this.adminService.getCategories().subscribe(
      response => {
        console.log("categories:");
        console.log(response);
        this.categories = response; }

    )



    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    console.log("Login Id: " + this.loginId);


    this.editTenderForm = new FormGroup({
      'tenderName' : new FormControl(this.tender['tender_title'], Validators.required),
      'category' : new FormControl(null, Validators.required),
      'description':new FormControl(this.tender['tender_explain'], Validators.required),
      'schoolfromdate':new FormControl(null, Validators.required), 
      'schoolstartTime':new FormControl(null, Validators.required),
      'schooltodate':new FormControl(null, Validators.required),
      'schoolendTime':new FormControl(null, Validators.required),
      'companyfromdate':new FormControl(null, Validators.required), 
      'companystartTime':new FormControl(null, Validators.required),
      'companytodate':new FormControl(null, Validators.required),
      'companyendTime':new FormControl(null, Validators.required)
    })
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
      this.editTenderForm.controls['schoolstartTime'].setValue(time) ;
      this.editTenderForm.controls['schoolendTime'].setValue(this.schoolEndTime.nativeElement.value) ; 
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
    this.editTenderForm.controls['schoolendTime'].setValue(time) ;
    this.editTenderForm.controls['schoolstartTime'].setValue(this.schoolStartTime.nativeElement.value) ;
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
    this.editTenderForm.controls['companystartTime'].setValue(time) ;
    this.editTenderForm.controls['companyendTime'].setValue(this.companyEndTime.nativeElement.value) ; 
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
  this.editTenderForm.controls['companyendTime'].setValue(time) ;
  this.editTenderForm.controls['companystartTime'].setValue(this.companyStartTime.nativeElement.value) ;
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




editTender(){
  console.log(this.editTenderForm)

 const schoolfromDate = new Date(this.editTenderForm.get('schoolfromdate').value +  " " + this.editTenderForm.get('schoolstartTime').value);

 const schooltoDate = new Date(this.editTenderForm.get('schooltodate').value +  " " + this.editTenderForm.get('schoolendTime').value);

 const companyfromDate = new Date(this.editTenderForm.get('companyfromdate').value +  " " + this.editTenderForm.get('companystartTime').value);

 const companytoDate = new Date(this.editTenderForm.get('companytodate').value +  " " + this.editTenderForm.get('companyendTime').value);
 

 for(let c of this.returnedCats){
   this.catNames.push({category_name: c.category_name});
  console.log("Retuen cat: " + c.category_name)
}

 console.log(schoolfromDate.getTime() + "is of type: " + typeof(schoolfromDate.getTime() ));
 console.log(schooltoDate.getTime());





 // here i should pass the right data depending on the Endpoint



 let data = {
  tender_id: this.tenderId,
  tender_explain: this.editTenderForm.get('description').value,
  tender_title: this.editTenderForm.get('tenderName').value,
  tender_display_date: schoolfromDate.getTime(),
  tender_expire_date: schooltoDate.getTime(),
  tender_company_display_date: companyfromDate.getTime(),
  tender_company_expired_date: companytoDate.getTime(),
  cats: this.catNames
 }

 console.log("Name is: " + this.editTenderForm.get('tenderName').value + " is of type: " + typeof(this.editTenderForm.get('tenderName').value))
 console.log(" description is: " + this.editTenderForm.get('description').value + " is of type: " + typeof(this.editTenderForm.get('description').value))
 console.log("from date is: "+ schoolfromDate.getTime() + " is of type: " + typeof(schoolfromDate.getTime()));
 console.log("to date is: "+ schooltoDate.getTime() + " is of type: " + typeof(schooltoDate.getTime()));
 console.log("Login ID: " + this.loginId);



 





 this.adminService.updateTender(data).subscribe(
  response => {
    console.log(response)
   this.router.navigate(['/admin','tenders',this.tenderId,'company']);
  }, err  =>  {
    this.errMessage = err.error.message;
    if( err.error.cats) {
      this.catsExist = true;
      this.cats = err.error.cats; 
    }
    
    document.getElementById("openModalButton").click();
   

   while(this.catNames.length >0){
     this.catNames.pop();
   }
   while(this.returnedCats.length >0){
    this.returnedCats.pop();
  }

   for(let cat of this.catNames) {
     console.log("Remain cats: ");
     console.log(cat)
   }
   for(let cat of this.returnedCats) {
    console.log("Remain cats: ");
    console.log(cat)
  }
   
   this.editTenderForm.get('category').reset();
    console.log(err)
  
  }
 )





}



}
