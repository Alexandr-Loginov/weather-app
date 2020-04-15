import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppService } from './app.service';
import { WeatherGateway } from './weather.gateway';

@Module({
    imports: [ScheduleModule.forRoot(), HttpModule],
    providers: [AppService, WeatherGateway],
})
export class AppModule {}
