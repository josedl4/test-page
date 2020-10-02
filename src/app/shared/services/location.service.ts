import { Injectable } from '@angular/core';
import { IGeoLocation } from '@shared/models/location';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private BASE_GOOGLE_MAPS_URL = 'https://www.google.com/maps/dir//';

    constructor() { }

    getPosition = (): Promise<any> => new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resp => resolve({
            longitude: resp.coords.longitude,
            latitude: resp.coords.latitude
        } as IGeoLocation), err => reject(err)))

    getNavigationUrl = (location: IGeoLocation): string =>
        `${this.BASE_GOOGLE_MAPS_URL}${location.latitude},${location.longitude}/`
}

