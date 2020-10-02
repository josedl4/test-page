import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IParkingResponse, Parking } from '@shared/models/parking';

import { map } from 'rxjs/operators';
import { BASE_API_PATH } from '@shared/constants/constants_parking';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private headers: HttpHeaders = new HttpHeaders();
  private getParkingsUrl = (): string => `${BASE_API_PATH}`;

  constructor(private http: HttpClient) {
    this.headers = this.headers.set('Accept', 'application/json');
  }

  public getParkings = (): Promise<Parking[]> =>
    this.http.get<Parking[]>(this.getParkingsUrl(), { headers: this.headers }).pipe(map(this.parseParkings)).toPromise();

  private parseParkings = (parkingsResponse: any): Parking[] => parkingsResponse['@graph'].map((p: IParkingResponse) => this.mapParking(p));

  private mapParking = (parkingItem: IParkingResponse): Parking => ({
    title: parkingItem.title,
    description: parkingItem.organization['organization-desc'] || '',
    address: {
      locality: parkingItem.address.locality,
      postalCode: parkingItem.address['postal-code'],
      streetAddress: parkingItem.address['street-address']
    },
    distance: null,
    location: parkingItem.location
  })
}
