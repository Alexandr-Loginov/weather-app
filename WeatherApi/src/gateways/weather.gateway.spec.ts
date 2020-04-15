import { Test, TestingModule } from '@nestjs/testing';

import { WeatherGateway } from './weather.gateway';

describe('WeatherGateway', () => {
    let gateway: WeatherGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WeatherGateway],
        }).compile();

        gateway = module.get<WeatherGateway>(WeatherGateway);
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
