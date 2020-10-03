import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_KEY, BASE_API_PATH } from '@shared/constants/constants_weather';
import { IGeoLocation } from '@shared/models/location';
import { IWeatherAllDataResponse, IWeatherForecast, IWeatherResponse, WeatherCity } from '@shared/models/weather_city';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private ICON_SIZES = {
    SMALL: '',
    MEDIUM: '@2x'
  };
  private getCurrentWeatherUrl = () => `${BASE_API_PATH}/weather`;
  private getWeatherAllDataUrl = () => `${BASE_API_PATH}/onecall`;
  private getIconUrl = (iconId: string, size = this.ICON_SIZES.SMALL) =>
    `https://openweathermap.org/img/wn/${iconId}${size}.png`

  constructor(private http: HttpClient) { }

  public async getCityDataByName(text: string): Promise<WeatherCity> {
    let params = new HttpParams();
    params = params.set('appid', API_KEY);
    params = params.set('q', text);
    params = params.set('units', 'metric');
    const city = await this.http.get(this.getCurrentWeatherUrl(), { params }).pipe(map(this.mapCity)).toPromise();
    return this.getAllData(city);
  }
  public async getCityDataByLocation(location: IGeoLocation): Promise<WeatherCity> {
    let params = new HttpParams();
    params = params.set('appid', API_KEY);
    params = params.set('lat', location.latitude.toString());
    params = params.set('lon', location.longitude.toString());
    params = params.set('units', 'metric');
    const city = await this.http.get(this.getCurrentWeatherUrl(), { params }).pipe(map(this.mapCity)).toPromise();
    return this.getAllData(city);
  }

  private async getAllData(city: WeatherCity): Promise<WeatherCity> {
    let params = new HttpParams();
    params = params.set('appid', API_KEY);
    params = params.set('lat', city.coordinates.latitude.toString());
    params = params.set('lon', city.coordinates.longitude.toString());
    params = params.set('units', 'metric');
    params = params.set('exclude', 'minutely,hourly,alerts,current');
    city.forecast = await this.http.get(this.getWeatherAllDataUrl(), { params }).pipe(map(this.parseForecastResponse)).toPromise();
    return city;
  }

  private parseForecastResponse = (res: IWeatherAllDataResponse): IWeatherForecast[] => res.daily.map((dayForecast) =>
    this.mapDayForecast(dayForecast, res.timezone_offset))
  private mapDayForecast = (dayForecast: any, tzOffset: number): IWeatherForecast => ({
    date: this.getDate(dayForecast.dt, tzOffset),
    weather: {
      temp: dayForecast.temp.day,
      pressure: dayForecast.pressure,
      humidity: dayForecast.humidity,
      windSpeed: dayForecast.wind_speed,
      clouds: dayForecast.clouds,
      weatherStatus: {
        icon: this.getIconUrl(dayForecast.weather[0].icon, this.ICON_SIZES.SMALL),
        main: dayForecast.weather[0].main,
        description: dayForecast.weather[0].description
      }
    }
  })

  private getDate = (td: number, tzOffset: number): Date => new Date(((td + tzOffset) * 1000));

  private mapCity = (weatherCity: IWeatherResponse): WeatherCity => ({
    id: weatherCity.id,
    name: weatherCity.name,
    country: weatherCity.sys.country,
    coordinates: { longitude: weatherCity.coord.lon, latitude: weatherCity.coord.lat },
    currentWeather: {
      temp: weatherCity.main.temp,
      pressure: weatherCity.main.pressure,
      humidity: weatherCity.main.humidity,
      windSpeed: weatherCity.wind.speed,
      clouds: weatherCity.clouds.all,
      weatherStatus: {
        icon: this.getIconUrl(weatherCity.weather[0].icon, this.ICON_SIZES.MEDIUM),
        main: weatherCity.weather[0].main,
        description: weatherCity.weather[0].description
      }
    },
    forecast: []
  })
}
