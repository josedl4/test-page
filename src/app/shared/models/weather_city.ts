import { IGeoLocation } from './location';

export interface IWeatherStatus {
    main: string;
    description: string;
    icon: string;
}

export interface ICurrentWeather {
    temp: number;
    pressure: number;
    humidity: number;
    windSpeed: number;
    clouds: number;
    weatherStatus: IWeatherStatus;
}

export interface IWeatherForecast {
    weather: ICurrentWeather;
    date: Date;
}

export interface IWeatherAllDataResponse {
    timezone_offset: number;
    daily: {
        dt: number;
        temp: {
            day: number
        },
        pressure: number,
        humidity: number,
        wind_speed: number,
        clouds: number,
        weather: IWeatherStatus[],
    }[];
}

export interface IWeatherResponse {
    weather: IWeatherStatus[];
    main: {
        temp: number;
        pressure: number;
        humidity: number;
    };
    wind: { speed: number };
    clouds: { all: number };
    id: string;
    name: string;
    sys: { country: string };
    coord: { lon: number, lat: number };
}

export class WeatherCity {
    id: string;
    name: string;
    country: string;
    coordinates: IGeoLocation;
    currentWeather: ICurrentWeather;
    forecast: IWeatherForecast[];

    constructor(data: WeatherCity) {
        this.id = data.id;
        this.name = data.name;
        this.country = data.country;
        this.coordinates = data.coordinates;
        this.currentWeather = data.currentWeather;
        this.forecast = data.forecast;
    }
}
