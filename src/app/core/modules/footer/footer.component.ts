import { Component, OnInit } from '@angular/core';
import { SubscribeService } from '../../services/subscribe.service'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  constructor(private subscribeAdd : SubscribeService) { }

  private subscribe_mail:String;
  
  ngOnInit() {
  }
  subscribeFunction(){
    let request:Object;
    request['mail'] =this.subscribe_mail;
    this.subscribeAdd.addToMailList(request).subscribe(
      (response) =>{
       if(response['status']==200){
         console.log('success');
       }
       else console.log('fail');
       
      },
      (error) => {
        console.log('fail');
        console.log('errors ', error)
      }
    );
  }
  
}
