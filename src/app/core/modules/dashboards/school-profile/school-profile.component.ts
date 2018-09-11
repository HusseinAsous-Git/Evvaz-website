
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SchoolProfileModel } from '../../../models/school.profile.model';
import { SchoolService } from '../../../services/school.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.css']
})
export class SchoolProfileComponent implements OnInit {

   
  public SchoolProfileForm: FormGroup;
  private activeProfile : SchoolProfileModel ;
  isloading : boolean = false;
//  private currentProfile: CompanyOfferModel [];
file;

  srcLogo: string;
  srcCover: string;
  hashLogo: string;
  hashCover: string
  enableMessage = false;
  logoSizeIsValid : boolean = true;
  coverSizeIsValid: boolean = true;
  logoSize: number; 
  coverSize: number;
  loginId: number;
  profileExistance = false;
  currentUser;
  constructor(private schoolSerivce: SchoolService, private activatedRoute: ActivatedRoute, private router: Router) {
    

   }


  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData= JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];

    this.SchoolProfileForm = new FormGroup({
      'schoolName': new FormControl(null, Validators.required),
      'link': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'website': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
      
    });


   

   

    this.schoolSerivce.getProfile(this.loginId).subscribe(
      (response) => { 
        if(response){
          this.isloading = false;
          this.profileExistance = true;
        this.activeProfile = response;
        this.srcLogo = 'data:image/png;base64,' + this.activeProfile.school_logo_image;
        this.srcCover = 'data:image/png;base64,' + this.activeProfile.school_cover_image;
        console.log("Active profile");
        console.log(this.activeProfile)

        this.SchoolProfileForm = new FormGroup({
          'schoolName': new FormControl(this.activeProfile.school_name, [Validators.required,Validators.minLength(3)]),
          'link': new FormControl(this.activeProfile.school_link_youtube,[Validators.required, Validators.minLength(22)]),
          'phone': new FormControl(this.activeProfile.school_phone_number, Validators.required),
          'address': new FormControl(this.activeProfile.school_address, Validators.required),
          'website': new FormControl(this.activeProfile.school_website_url, Validators.required),
          'description': new FormControl(this.activeProfile.school_service_desc, Validators.required)
        });
      }



      }, err => {
        this.profileExistance = false;
        console.log(err)
      }
    );

  
   
   
  }
    onUploadChange(evt: any) {
      const file = evt.target.files[0];
      this.logoSize = file.size;
      if (file) {
        const reader = new FileReader();
    
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
        if(this.logoSize > 2097152){
          this.logoSizeIsValid = false;
          }else {
            this.logoSizeIsValid = true;
          }
      }
    }
    
    handleReaderLoaded(e) {
     this.hashLogo = btoa(e.target.result);
      this.srcLogo = 'data:image/png;base64,' + btoa(e.target.result);
    }
  
  
    onUploadChangeCover(evt: any) {
      this.file = evt.target.files[0];
      this.coverSize = this.file.size;
      if (this.file) {
        const reader = new FileReader();
    
        reader.onload = this.handleReaderLoadedCover.bind(this);
        reader.readAsBinaryString(this.file);
        if(this.coverSize >2097152 ){
          this.coverSizeIsValid = false;
          }else{
            this.coverSizeIsValid = true;
          }
      }
    }


    handleReaderLoadedCover(e) {
     this.hashCover =  btoa(e.target.result);
      this.srcCover = 'data:image/png;base64,' + btoa(e.target.result);
    }


    imageCropped(image: string) {
      this.srcCover = image;
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }

    updateProfile(){
      this.isloading = true;
      // this.profileForm = new FormGroup({
      //   'companyName': new FormControl(this.activeProfile.company_name, Validators.required),
      //   'link': new FormControl(this.activeProfile.company_link_youtube, Validators.required),
      //   'phone': new FormControl(this.activeProfile.company_phone_number, Validators.required),
      //   'address': new FormControl(this.activeProfile.company_address, Validators.required),
      //   'website': new FormControl(this.activeProfile.company_website_url, Validators.required),
      //   'logo': new FormControl(this.hashLogo, Validators.required),
      //   'cover': new FormControl(this.hashCover, Validators.required)
      // });


      
      let data  = {
        school_id : this.loginId,
        school_name: this.SchoolProfileForm.get('schoolName').value,
        school_logo_image: this.hashLogo == null ? this.activeProfile.school_logo_image : this.hashLogo,
        school_address: this.SchoolProfileForm.get('address').value, 
        school_link_youtube: this.SchoolProfileForm.get('link').value,
        school_website_url: this.SchoolProfileForm.get('website').value,
        school_cover_image: this.hashCover == null ? this.activeProfile.school_cover_image : this.hashCover,
        school_phone_number: this.SchoolProfileForm.get('phone').value,
        school_service_desc: this.SchoolProfileForm.get('description').value,
      }


      console.log("Name: " + data.school_name + " is of type: "+ typeof(data.school_name));
      console.log("Logo: " + data.school_logo_image + " is of type: "+ typeof(data.school_logo_image));
      console.log("Address: " + data.school_address + " is of type: "+ typeof(data.school_address));
      console.log("Link: " + data.school_link_youtube + " is of type: "+ typeof(data.school_link_youtube));
      console.log("website: " + data.school_website_url + " is of type: "+ typeof(data.school_website_url));
      console.log("cover: " + data.school_cover_image + " is of type: "+ typeof(data.school_cover_image));
      console.log("phone: " + data.school_phone_number + " is of type: "+ typeof(data.school_phone_number));

      // this.schoolSerivce.updateProfile(data).subscribe(

      //   response => {
      //     console.log("Succeeded" + response); 
      //     this.router.navigate(['/school']);
      //   },
      //   err => console.log("Error: "+err)

      // )



      console.log("Profile is: "+ this.profileExistance)
      if(this.profileExistance){
      this.schoolSerivce.updateProfile(data).subscribe(

        response => {
          console.log("Succeeded updated" + response); 

          setTimeout(()=> {
            this.isloading = true;
          },0)
          
          setTimeout(()=> {
            this.isloading = false;
            this.router.navigate(['/school']);
          },1000)

          
        },
        err => console.log("Error: "+err)

      )
      return ;
    }
    else {
      this.schoolSerivce.createProfile(data).subscribe(
        response => {



          console.log("Succeeded created" + response);
          setTimeout(()=> {
            this.isloading = true;
          },0)
          
          setTimeout(()=> {
            this.isloading = false;
            this.router.navigate(['/school']);
          },1000)


          this.profileExistance = true;


         
        },
        err => console.log(err)
      )
      return ;
    }





    }

}
