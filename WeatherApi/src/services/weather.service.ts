import { HttpService, Injectable, OnModuleDestroy } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { interval, Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';

import { IWeather, Queries } from '../models';

@Injectable()
export class WeatherService implements OnModuleDestroy {
    private requestUrl = 'https://api.openweathermap.org/data/2.5/weather';
    private unsubscriber$ = new Subject<void>();
    private readonly interval = 1000;

    private readonly weatherAppId = process.env.WEATHER_API_KEY;

    constructor(private httpService: HttpService) {}

    public onModuleDestroy(): void {
        this.unsubscriber$.next();
        this.unsubscriber$.complete();
    }

    public getServiceInfo(
        location?,
        zip?,
        lang?,
        mode?,
    ): Observable<AxiosResponse<IWeather>> {
        return interval(this.interval).pipe(
            switchMap(() =>
                this.httpService.get(this.requestUrl, {
                    params: {
                        [Queries.CITY]: location,
                        [Queries.APPID]: this.weatherAppId,
                        [Queries.ZIP]: zip,
                        [Queries.LANG]: lang,
                        [Queries.MODE]: mode,
                    },
                }),
            ),
            map(data => data.data),
            takeUntil(this.unsubscriber$),
            catchError(err => of(err)),
        );
    }

    public stopEmittingWeatherUpdates(): void {
        if (!this.unsubscriber$.isStopped) {
            this.unsubscriber$.next();
        }
    }
}
