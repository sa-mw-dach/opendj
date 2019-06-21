import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';
import { EnvService } from './env.service';

@Injectable()
export class WebsocketService {

    // Our socket connection
    private socket;

    constructor(private envService: EnvService) {
        this.socket = io(envService.websocketUrl, {
            reconnectionAttempts: 10
        });
    }

    getPlaylist() {
        const observable = new Observable(observer => {
            this.socket.on('current-playlist', (data) => {
                console.log('Received playlist update from Websocket Server');
                observer.next(data);
            });
        });
        return observable;
    }

    updatePlaylist(playlist) {
        this.socket.emit('update-playlist', playlist);
    }

}
