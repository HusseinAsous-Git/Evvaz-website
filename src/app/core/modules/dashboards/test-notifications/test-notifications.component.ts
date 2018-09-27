import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../services/web.socket.service';

@Component({
  selector: 'app-test-notifications',
  templateUrl: './test-notifications.component.html',
  styleUrls: ['./test-notifications.component.scss']
})
export class TestNotificationsComponent implements OnInit {
  public notifications = 0;

  
  constructor(private webSocketService: WebSocketService) { 
    let stompClient = this.webSocketService.connect();
        stompClient.connect({}, frame => {

			// Subscribe to notification topic
            stompClient.subscribe('/topic/notification', notifications => {

				// Update notifications attribute with the recent messsage sent from the server
                this.notifications = JSON.parse(notifications.body).count;
            })
        });

  }

  ngOnInit() {
  }

}
