import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { UserIdleService } from '../../node_modules/angular-user-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  //resolved(captchaResponse: string) {
    //console.log(`Resolved captcha with response ${captchaResponse}:`);
  //}

  constructor(private userIdle: UserIdleService) {}




  ngOnInit(){
     //Start watching for user inactivity.
     this.userIdle.startWatching();
    
     // Start watching when user idle is starting.
     this.userIdle.onTimerStart().subscribe(
       count =>
      { 
        console.log("Start watching when user idle is starting.")
        console.log(count)
      });
     
     // Start watch when time is up.
     this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));
  }


stop() {
    this.userIdle.stopTimer();
  }
 
  stopWatching() {
    this.userIdle.stopWatching();
  }
 
  startWatching() {
    this.userIdle.startWatching();
  }
 
  restart() {
    this.userIdle.resetTimer();
  }

}
