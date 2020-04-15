import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { IWeather, MessageTypes } from '../models/weather.model';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    public get messageObservable(): Observable<IWeather> {
        return this.socket.fromEvent(MessageTypes.GET);
    }

    constructor(private socket: Socket) {}

    public sendLocation(location): void {
        this.socket.emit(MessageTypes.SEND, location);
    }
}
