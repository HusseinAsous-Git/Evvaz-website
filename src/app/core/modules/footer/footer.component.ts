import { Component, OnInit } from '@angular/core';
import { SubscribeService } from '../../services/subscribe.service'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  constructor(private subscribeAdd : SubscribeService) { }

  private subscribe_mail={
    "mail":""
  };
  
  ngOnInit() {
  }
  subscribeFunction(){
    this.subscribeAdd.addToMailList(this.subscribe_mail).subscribe(
      (response) =>{
       if(response['status']==200){
         console.log('success');
         document.getElementById("successModalButton").click();
       }
       else{
        console.log('fail');
        document.getElementById("failModalButton").click();
       }
       
      },
      (error) => {
        document.getElementById("failModalButton").click();
        console.log('fail');
        console.log('errors ', error)
      }
    );
  }
  
}
