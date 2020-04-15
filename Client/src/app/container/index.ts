import { AppComponent } from './app/app.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { WeatherComponent } from './weather/weather.component';

export const containers = [
    AppComponent,
    WeatherComponent,
    TemperatureChartComponent,
];

export * from './app/app.component';
export * from './weather/weather.component';
export * from './temperature-chart/temperature-chart.component';
