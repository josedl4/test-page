import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGeoLocation } from '@shared/models/location';
import { WeatherCity } from '@shared/models/weather_city';
import { LocationService } from '@shared/services/location.service';
import { debounceTime } from 'rxjs/operators';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  searchForm: FormGroup;
  currentLocation: IGeoLocation;
  public loading = false;
  public cityWeather: WeatherCity;
  public displayedColumns: string[] = [
    'date',
    'description',
    'temp',
    'humidity',
    'windSpeed',
    'clouds'
  ];

  constructor(private locationService: LocationService, private weatherService: WeatherService) {
    this.searchForm = new FormGroup({
      searchText: new FormControl({ disabled: false, value: null }, { validators: Validators.required })
    });
  }

  ngOnInit(): void { }

  async searchPattern(): Promise<void> {
    const text = this.searchForm.get('searchText').value;
    this.cityWeather = await this.weatherService.getCityDataByName(text);
    console.log(this.cityWeather);
  }

  async searchByLocation(): Promise<void> {
    this.loading = true;
    try {
      this.currentLocation = await this.locationService.getPosition();
      if (this.currentLocation) {
        this.cityWeather = await this.weatherService.getCityDataByLocation(this.currentLocation);
        console.log(this.cityWeather);
      }
    } catch (e) {
      console.log('Rejected');
    }
    this.loading = false;
  }

}
