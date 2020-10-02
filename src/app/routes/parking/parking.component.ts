import { Component, OnInit } from '@angular/core';
import { IGeoLocation } from '@shared/models/location';
import { Parking } from '@shared/models/parking';
import { LocationService } from '@shared/services/location.service';
import { ParkingService } from './parking.service';
import { getDistance } from 'geolib';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {

  public allParkings: Parking[] = [];
  public displayedColumns: string[] = ['title', 'description', 'address', 'distance', 'directions'];

  public currentLocation: IGeoLocation;
  public loading = false;

  constructor(
    private parkingService: ParkingService,
    private locationService: LocationService) {
  }


  async ngOnInit(): Promise<void> {
    this.allParkings = await this.parkingService.getParkings();
  }

  sortByDistance = async (): Promise<void> => {
    this.loading = true;
    try {
      this.currentLocation = await this.locationService.getPosition();
      if (this.currentLocation) {
        const tmpList = this.allParkings.map((p: Parking) => {
          p.distance = (getDistance(this.currentLocation, p.location) / 1000);
          return p;
        });
        this.allParkings = tmpList.sort((a, b) => a.distance - b.distance);
      }
    } catch (e) {
      console.log('Rejected');
    }
    this.loading = false;
  }

  howToArrive = (location: IGeoLocation) => {
    if (location) {
      window.open(this.locationService.getNavigationUrl(location), '_blank');
    }
  }



}
