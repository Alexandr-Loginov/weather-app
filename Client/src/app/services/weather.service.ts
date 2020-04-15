import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { IWeather, MessageTypes } from '../models/weather.model';

@Injectable({
    providedIn: 'root',
})
export class WeatherService implements OnDestroy {
    public get messageObservable(): Observable<IWeather> {
        return this.socket.fromEvent(MessageTypes.GET);
    }

    constructor(private socket: Socket) {}

    public sendLocation(location): void {
        this.socket.emit(MessageTypes.SEND, location);
    }

    public ngOnDestroy(): void {
        this.socket.disconnect();
    }
}
