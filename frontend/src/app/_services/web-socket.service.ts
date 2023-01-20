import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  socket = io('http://localhost:3000');

  sendMessage(comment :any) {
    this.socket.emit('message', comment);
  }

  getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };

}
