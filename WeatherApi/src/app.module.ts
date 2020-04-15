import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import * as fromGateways from './gateways';
import * as fromServices from './services';

@Module({
    imports: [ScheduleModule.forRoot(), HttpModule],
    providers: [...fromServices.services, ...fromGateways.gateways],
})
export class AppModule {}
