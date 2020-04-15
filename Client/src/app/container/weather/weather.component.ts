import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { IWeather } from '../../models';
import { WeatherService } from '../../services';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {
    public temperature = [];
    public responseError = false;
    public currentCity = '';

    public placePickerField = new FormControl('', Validators.required);

    private subsDestroyer$ = new Subject<void>();

    constructor(private weatherService: WeatherService) {}

    ngOnInit() {
        this.weatherService.messageObservable
            .pipe(
                takeUntil(this.subsDestroyer$),
                filter((value: IWeather) => {
                    this.responseError = value.name === 'Error';
                    return !this.responseError;
                })
            )
            .subscribe((value) => {
                this.responseError = false;
                this.currentCity = value.name;
                const temp = [
                    ...this.temperature,
                    {
                        date: new Date().toLocaleTimeString(),
                        data: value,
                    },
                ];
                if (temp.length > 20) {
                    temp.shift();
                }
                this.temperature = temp;
            });
    }

    public locate(): void {
        this.weatherService.sendLocation(this.placePickerField.value);
    }

    public ngOnDestroy(): void {
        this.subsDestroyer$.complete();
    }
}
