import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Socket } from 'socket.io';

import { AppService } from './app.service';

@WebSocketGateway()
export class WeatherGateway
    implements OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('WeatherGateway');
    private unsubscriber$ = new Subject<void>();

    constructor(private weatherService: AppService) {}

    @SubscribeMessage('changeLocation')
    public handleMessage(socket: Socket, data: string): void {
        this.unsubscriber$.next();
        this.weatherService
            .getServiceInfo(data)
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe(currentWeather => {
                this.logger.log(currentWeather);
                socket.emit('weatherUpdate', currentWeather);
            });
        this.logger.log('startEmiting1');
    }

    afterInit() {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.unsubscriber$.next();
        this.weatherService.stopEmittingWeatherUpdates();
        this.logger.log(`Client disconnected: ${client}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client}`);
    }
}
