import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../../../services/company.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyOfferModel } from "../../../models/company.offer.see.model";


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private companyService: CompanyService, private router:Router, private activatedRoute:ActivatedRoute) { }
  isloading: boolean = true;
  public companyOffers : CompanyOfferModel []=[] ;
  loginId : number;
  currentUser;
  ngOnInit() {
    this.currentUser = localStorage.getItem("@MYUSER");
    let userData = JSON.parse(this.currentUser);
    this.loginId = userData['login_id'];
    this.isloading = true;
    this.companyService.seeAllOffers(this.loginId).subscribe(
      (response) => {
        
        if(response){
          this.isloading = false;
          this.companyOffers = response['list'];
       console.log(response)

       

         // this.companyOffers = response;

     //   console.log(this.companyOffers);
        }
      },
      (err) => console.log("ERROR IN offers COMPONENT")
    );
  }


  // this method is under test

  deleteOffer(data: CompanyOfferModel, index : number) {
    
//    console.log("record deleted successfully !") ; 
     
     this.companyService.deleteOffer(data.offer_id).subscribe(
       res =>{
         this.companyOffers.splice(index,1);
     //   console.log("record deleted successfully !") ; 
         this.router.navigate(["../see"], {relativeTo:this.activatedRoute});
      }
       , 
       err => {
        (err) => console.log("ERROR IN offers COMPONENT")
       }
     ) ; 
  }

  


}
