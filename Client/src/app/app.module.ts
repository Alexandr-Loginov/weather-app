import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';

import { APP_ROUTES } from './app.routes';
import { CONFIG } from './app.socket';
import * as fromAppContainers from './container';
import { TemperatureChartComponent } from './container/temperature-chart/temperature-chart.component';
import * as fromAppServices from './services';

@NgModule({
    declarations: [fromAppContainers.containers, TemperatureChartComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot(APP_ROUTES),
        SocketIoModule.forRoot(CONFIG),
    ],
    providers: [fromAppServices.services],
    bootstrap: [fromAppContainers.AppComponent],
})
export class AppModule {}
