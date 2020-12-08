import { config } from '../../../config/config';
import { Logger } from "src/server/modules/logger/logger";
import { IWeatherModule, Location } from 'src/server/modules/weather/types';

export type WeatherServiceDependencies = {
    weatherModule: IWeatherModule
    logger: Logger
}

export class WeatherService {
    constructor(
        private dependencies: WeatherServiceDependencies
    ) {}

    public async getCurrentData(location: Location): Promise<any> {
        try {
            const currentDataResp = await this.dependencies.weatherModule.getCurrentData(location);

            if (currentDataResp) {
                return Promise.resolve(currentDataResp);
            }
        } catch (e) {
            this.dependencies.logger.error(e);
            return Promise.reject(e);
        }
    }

    public async getForecastData(location: Location) {
        try {
            const forecastDataResp = await this.dependencies.weatherModule.getForecastData(location);

            if (forecastDataResp) {
                return Promise.resolve(forecastDataResp);
            }
        } catch (e) {
            this.dependencies.logger.error(e);
            return Promise.reject(e);
        }
    }
    
}