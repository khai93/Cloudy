import { config } from '../../../config/config';
import { Logger } from "src/server/logger/logger";
import { IRequestModule } from "../../modules/request/IRequestModule";
import { RequestOptions } from "../../modules/request/RequestOptions";

export type WeatherServiceDependencies = {
    requestModule: IRequestModule,
    logger: Logger
}

export type Location = {
    longitude: number,
    latitude: number
}

export type Units = "standard" | "metric" | "imperial"

export type OneCallResponse = {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    daily: {
        dt: number,
        sunrise: number,
        sunset: number,
        temp: {
            day: number,
            min: number,
            max: number,
            night: number,
            eve: number,
            morn: number
        },
        feels_like: {
            day: number,
            night: number,
            eve: number,
            morn: number
        },
        pressure: number,
        humidity: number,
        dew_point: number,
        wind_speed: number,
        wind_deg: number,
        weather: {
            id: number,
            main: string,
            description: string,
            icon: string
        }[],
        clouds: number,
        pop: 1,
        rain: number,
        uvi: number
    }[],
    alerts: {
        sender_name: string,
        event: string,
        start: number,
        end: number,
        description: string
    }
}

export class WeatherService {
    constructor(
        private dependencies: WeatherServiceDependencies
    ) {}

    public async getOneCallData(location: Location, units: Units): Promise<OneCallResponse>  {
        try {
            const oneCallUrl = new URL(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&units=${units}&exclude=hourly,minutely&appid=${config.openweather.apiKey}`);

            const options: RequestOptions = {
                url: oneCallUrl.toString()
            }

            const response = await this.dependencies.requestModule.request<OneCallResponse>(options);
            
            if (response) {
                return Promise.resolve(response);
            }

            return Promise.reject("Unexpected error occured while trying to grab the response of OneCall request");
        } catch (e) {
            this.dependencies.logger.error(e);
            return Promise.reject(e);
        }
    }
}