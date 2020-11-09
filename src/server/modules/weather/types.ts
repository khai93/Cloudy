export type Location = {
    longitude: number,
    latitude: number
}

export type CurrentDataResponse = {
    lat: number,
    lon: number,
    description: string,
    code: number,
    icon_url: string,
    temp: {
        cel: number,
        fah: number
    },
    feels_like: {
        cel: number,
        fah: number
    },
    humidity_level: number,
    wind_speed: {
        mph: number,
        kmh: number,
        kts: number,
        ms: number
    },
    wind_direction: {
        degree: number,
        compass: string
    },
    total_cloud_percentage: number
}

export type ForecastDataResponse = {
    days: {
        date: string,
        temp: {
            max: {
                cel: number,
                fah: number
            },
            min: {
                cel: number,
                fah: number
            }
        }
        precipitation: {
            mm: number,
            in: number
        },
        rain: {
            mm: number,
            in: number
        },
        snow: {
            mm: 0,
            in: 0
        },
        precipitation_probablility: number,
        time_frames: {
            date: string,
            time: number,
            utc_date: string,
            utc_time: number,
            description: string,
            code: number,
            icon_url: string,
            temp: {
                cel: number,
                fah: number
            },
            feels_like: {
                cel: number,
                fah: number
            },
            wind_direction: {
                degree: number,
                compass: string
            },
            wind_speed: {
                mph: number,
                kmh: number,
                kts: number,
                ms: number
            },
            precipitation: {
                mm: number,
                in: number
            },
            rain: {
                mm: number,
                in: number
            },
            snow: {
                mm: 0,
                in: 0
            },
            precipitation_probablility: number,
        }[]
    }[]
}

export interface IWeatherModule {
    getCurrentData(location: Location): Promise<CurrentDataResponse>;
    getForecastData(Location: Location): Promise<ForecastDataResponse>;
}