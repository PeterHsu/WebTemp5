import { Component } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor() {
    const hub = new signalR.HubConnection('/time');
    hub.on('send', data => {
      this.title = data;
    });
    hub.start()
      .then(() => hub.invoke('register'));
  }
}
