import { CurrentDataResponse, ForecastDataResponse, IWeatherModule, Location } from "./types";
import { IRequestModule, RequestOptions } from '../request/types';
import { config } from "src/config/config";

export type WeatherUnlockedModuleDependencies = {
    requestModule: IRequestModule
}

export class WeatherUnlockedModule implements IWeatherModule {
    
    constructor(
        private dependencies: WeatherUnlockedModuleDependencies
    ) {}

    public async getCurrentData(location: Location): Promise<CurrentDataResponse> {
        const currentDataUrl = new URL(`http://api.weatherunlocked.com/api/current/${location.latitude},${location.longitude}?app_id=${config.weather.appId}&app_key=${config.weather.apiKey}`);

        const options: RequestOptions = {
            url: currentDataUrl.toString()
        }

        const response = await this.dependencies.requestModule.request<any>(options);
            
        if (response) {
            return Promise.resolve(this.convertToCurrentDataResponse(response));
        }

        throw new Error("Unexpected error occured while requesting current data")
    }

    public async getForecastData(location: Location): Promise<ForecastDataResponse> {
        const currentDataUrl = new URL(`http://api.weatherunlocked.com/api/forecast/${location.latitude},${location.longitude}?app_id=${config.weather.appId}&app_key=${config.weather.apiKey}`);

        const options: RequestOptions = {
            url: currentDataUrl.toString()
        }

        const response = await this.dependencies.requestModule.request<any>(options);
            
        if (response) {
            return Promise.resolve(this.convertToForecastDataResponse(response));
        }

        throw new Error("Unexpected error occured while requesting forecast data")
    }

    private convertToCurrentDataResponse(response: any): CurrentDataResponse {
        const currentData: CurrentDataResponse = {
            lat: response.lat,
            lon: response.long,
            description: response.wx_desc,
            code: response.wx_desc,
            icon_url: "http://www.weatherunlocked.com/Images/icons/1/" + response.wx_icon,
            temp: {
                cel: response.temp_c,
                fah: response.temp_f
            },
            feels_like: {
                cel: response.feelslike_c,
                fah: response.feelslike_f
            },
            humidity_level: response.humid_pct,
            wind_speed: {
                mph: response.windspd_mph,
                kmh: response.windspd_kmh,
                kts: response.windspd_kts,
                ms: response.windspd_ms
            },
            wind_direction: {
                degree: response.winddir_deg,
                compass: response.winddir_compass
            },
            total_cloud_percentage: response.cloudtotal_pct
        }

        return currentData;
    }

    private convertToForecastDataResponse(response: any): ForecastDataResponse {
        const forecastData: ForecastDataResponse = {
            days: response.Days.map(day => ({
                date: day.date,
                temp: {
                    max: {
                        cel: day.temp_max_c,
                        fah: day.temp_max_f
                    },
                    min: {
                        cel: day.temp_min_c,
                        fah: day.temp_min_f
                    }
                },
                precipitation: {
                    mm: day.precip_total_mm,
                    in: day.precip_total_in
                },
                rain: {
                    mm: day.rain_total_mm,
                    in: day.rain_total_in
                },
                snow: {
                    mm: day.snow_total_mm,
                    in: day.snow_total_in
                },
                precipitation_probablility: day.prob_precip_pct,
                time_frames: day.Timeframes.map((timeframe) => ({
                    date: timeframe.date,
                    time: timeframe.time,
                    utc_date: timeframe.utcdate,
                    utc_time: timeframe.utctime,
                    description: timeframe.wx_desc,
                    code: timeframe.wx_code,
                    icon_url: "http://www.weatherunlocked.com/Images/icons/1/" + timeframe.wx_icon,
                    temp: {
                        cel: timeframe.temp_c,
                        fah: timeframe.temp_f
                    },
                    feels_like: {
                        cel: timeframe.feelslike_c,
                        fah: timeframe.feelslike_f
                    },
                    wind_direction: {
                        degree: timeframe.winddir_deg,
                        compass: timeframe.winddir_compass
                    },
                    wind_speed: {
                        mph: timeframe.windspd_mph,
                        kmh: timeframe.windspd_kmh,
                        kts: timeframe.windspd_kts,
                        ms: timeframe.windspd_ms
                    },
                    precipitation: {
                        mm: timeframe.precip_mm,
                        in: timeframe.precip_in
                    },
                    rain: {
                        mm: timeframe.rain_mm,
                        in: timeframe.rain_in
                    },
                    snow: {
                        mm: timeframe.snow_mm,
                        in: timeframe.snow_in
                    },
                    precipitation_probablility: timeframe.prob_precip_pct
                }))
            }))
        }

        return forecastData;
    }
}