import { Component, OnInit } from "../../../../../../node_modules/@angular/core";
import { CompanyService } from "../../../services/company.service";
import { Router, ActivatedRoute } from "../../../../../../node_modules/@angular/router";
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
    this.companyService.seeAllOffers().subscribe(
      (response) => {
        
        if(response){
          this.isloading = false;
        console.log("Response: " + response)

        for(let offer of response){
          if(offer.company_id === this.loginId){
            this.companyOffers.push(offer);
          }
        }

         // this.companyOffers = response;

        console.log(this.companyOffers);
        }
      },
      (err) => console.log("Error: " + err)
    );
  }


  // this method is under test

  deleteOffer(data: CompanyOfferModel, index : number) {
    
    console.log("record deleted successfully !") ; 
     
     this.companyService.deleteOffer(data.offer_id).subscribe(
       res =>{
         this.companyOffers.splice(index,1);
        console.log("record deleted successfully !") ; 
         this.router.navigate(["../see"], {relativeTo:this.activatedRoute});
      }
       , 
       err => {
         console.log(err) ;
       }
     ) ; 
  }

  


}
