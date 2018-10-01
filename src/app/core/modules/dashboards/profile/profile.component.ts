import { AdminService } from './../../../services/admin.service';
import { CategoryModel } from '../../../models/category.model';
import { AuthService } from '../../../services/auth.service';
import { ProfileServiceDashboard } from '../../../services/profile.service.dashboard';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyProfileModel } from '../../../models/company.profile.model';
import { CompanyOfferModel } from '../../../models/company.offer.see.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCategory } from '../../../models/admin.cat.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  public profileForm: FormGroup;
  private activeProfile : CompanyProfileModel ;

  private currentProfile: CompanyOfferModel [];
logoSize: number; 
coverSize;
  srcLogo: string;
  srcCover: string;
  hashLogo: string;
  hashCover: string
  enableMessage = false;
  logoSizeIsValid : boolean = true;
  coverSizeIsValid: boolean = true;
  currentUser ;
  loginId: number;
  prfileExistance : boolean ;
  categories : CategoryModel [] ;
  categoryName : string;
  isloading: boolean = false;
  firstTime: boolean = false;
  adminCategories;
  returnedCats: AdminCategory [] = [];
  catNames : {category_name: string} [] = [];
  constructor(private profileService: ProfileServiceDashboard,
     private activatedRoute: ActivatedRoute, private adminService:AdminService,
      private router: Router, private authService: AuthService) { }

  ngOnInit() {
      this.currentUser = localStorage.getItem("@MYUSER");
     // console.log("Current user: " + this.currentUser)
      let currentUserData= JSON.parse(this.currentUser);
      this.loginId = currentUserData["login_id"];
   //   console.log("login id: " + this.loginId);  
      

    this.profileForm = new FormGroup({
      'companyName': new FormControl(null, Validators.required),
      'link': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'website': new FormControl(null, Validators.required),
      'logo': new FormControl(null, Validators.required),
      'cover': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'category' : new FormControl(null, Validators.required)
    });


    this.profileService.getCategories().subscribe(
      respnse => {
        this.adminCategories = respnse;
        //console.log("Categories: "+ this.adminCategories)
      },
      err => console.log("ERROR IN profile COMPONENT")
    )
    

   
    this.profileService.getProfile(this.loginId).subscribe(
      (response) => { 
        this.activeProfile = response;
        this.srcLogo = 'data:image/png;base64,' + this.activeProfile.company_logo_image;
        this.srcCover = 'data:image/png;base64,' + this.activeProfile.company_cover_image;
      //  console.log("Active profile");
      //  console.log(this.activeProfile)
        
        this.prfileExistance = true;
        this.profileForm = new FormGroup({
          'companyName': new FormControl(this.activeProfile.company_name, [Validators.required,Validators.minLength(3)]),
          'link': new FormControl(this.activeProfile.company_link_youtube, [Validators.required, Validators.minLength(22)]),
          'phone': new FormControl(this.activeProfile.company_phone_number, Validators.required),
          'address': new FormControl(this.activeProfile.company_address, Validators.required),
          'website': new FormControl(this.activeProfile.company_website_url, Validators.required),
          'category' : new FormControl(null, Validators.required),
          'description' : new FormControl(this.activeProfile.company_desc, Validators.required)
        });
    
      


      },
      err =>{
        this.prfileExistance = false;
      //  console.log("Error" + err)
      }
    );
  
  
    if(this.prfileExistance) {
      this.firstTime = true;
    }
 
   
    // this.adminService.getCategories().subscribe(
    //   response => {
    //     //console.log(response);
    //     this.adminCategories = response; }

    // )
  }


  hasChecked(e  ,category: AdminCategory, index: number){
  //  console.log(e.checked);
   // console.log(category);
  
  
  
  
    if(e.target.checked){
  
      
  
      this.returnedCats.push(category)
     
    }
    else{
      this.returnedCats.splice(index, 1);
      
     }
    
   
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
      const file = evt.target.files[0];
      this.coverSize = file.size;
      if (file) {
        const reader = new FileReader();
    
        reader.onload = this.handleReaderLoadedCover.bind(this);
        reader.readAsBinaryString(file);
        if(this.coverSize >2097152 ){
        this.coverSizeIsValid = false;
        }else{
          this.coverSizeIsValid = true;
        }

      }
    }

    //2097152
    handleReaderLoadedCover(e) {
     this.hashCover =  btoa(e.target.result);
      this.srcCover = 'data:image/png;base64,' + btoa(e.target.result);
    }




    updateProfile(){
      this.isloading = true;
      for(let c of this.returnedCats){
        this.catNames.push({category_name: c.category_name});
      // console.log("Retuen cat: " + c.category_name)
     }

      // this.profileForm = new FormGroup({
      //   'companyName': new FormControl(this.activeProfile.company_name, Validators.required),
      //   'link': new FormControl(this.activeProfile.company_link_youtube, Validators.required),
      //   'phone': new FormControl(this.activeProfile.company_phone_number, Validators.required),
      //   'address': new FormControl(this.activeProfile.company_address, Validators.required),
      //   'website': new FormControl(this.activeProfile.company_website_url, Validators.required),
      //   'logo': new FormControl(this.hashLogo, Validators.required),
      //   'cover': new FormControl(this.hashCover, Validators.required)
      // });

   //   console.log("id from update: " + this.loginId + " is of type " + typeof(this.loginId));

      


      if(!this.logoSizeIsValid || !this.coverSizeIsValid){
          this.enableMessage = true;
          return ;
      }

      // let html = this.profileForm.get('description').value;
      // var oParser = new DOMParser();
      //  var oDOM = oParser.parseFromString(html, "text/html");
      //  var descTxt = oDOM.body.innerText;
      //  console.log("After parsing: ")
      //  console.log(html);
      //  console.log("desc parsed is" )
      
      
      // console.log(descTxt)

      let data  = {
        company_id : this.loginId,
        company_name: this.profileForm.get('companyName').value,
        company_logo_image: this.hashLogo == null ? this.activeProfile.company_logo_image : this.hashLogo,
        company_address: this.profileForm.get('address').value, 
        company_link_youtube: this.profileForm.get('link').value,
        company_website_url: this.profileForm.get('website').value,
        company_cover_image: this.hashCover == null ? this.activeProfile.company_cover_image : this.hashCover,
        company_phone_number: this.profileForm.get('phone').value,
        
        company_desc:this.profileForm.get('description').value,
        category:this.catNames
      }

//
   //   console.log("Name: " + data.company_name + " is of type: "+ typeof(data.company_name));
   //   console.log("Logo: " + data.company_logo_image + " is of type: "+ typeof(data.company_logo_image));
    //  console.log("Address: " + data.company_address + " is of type: "+ typeof(data.company_address));
     // console.log("Link: " + data.company_link_youtube + " is of type: "+ typeof(data.company_link_youtube));
     // console.log("website: " + data.company_website_url + " is of type: "+ typeof(data.company_website_url));
     // console.log("cover: " + data.company_cover_image + " is of type: "+ typeof(data.company_cover_image));
    //  console.log("phone: " + data.company_phone_number + " is of type: "+ typeof(data.company_phone_number));
    


      
//console.log("Profile is: "+ this.prfileExistance)
      if(this.prfileExistance){
      this.profileService.updateProfile(data).subscribe(

        response => {
         // console.log("Succeeded updated" + response); 

          setTimeout(()=> {
            this.isloading = true;
          },0)
          
          setTimeout(()=> {
            this.isloading = false;
            this.router.navigate(['/company','intro']);
          },1000)

          
        },
        err => {
          console.log("ERROR IN profile COMPONENT")
          console.log(err)
        }

      )
      return ;
    }
    else {
      this.profileService.createProfile(data).subscribe(
        response => {



         // console.log("Succeeded created" + response);
          setTimeout(()=> {
            this.isloading = true;
          },0)
          
          setTimeout(()=> {
            this.isloading = false;
            this.router.navigate(['/company','intro']);
          },1000)





         
        },
        err => {
          console.log("ERROR IN profile COMPONENT")
          console.log(err)
        }
      )
      return ;
    }

  }
  

}
