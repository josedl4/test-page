import { IGeoLocation } from './location';

export interface IParkingAddress {
    locality: string;
    postalCode: string;
    streetAddress: string;
}

export interface IParkingResponse {
    title: string;
    address: {
        locality: string,
        'postal-code': string,
        'street-address': string
    };
    location: {
        latitude: number,
        longitude: number
    };
    organization: {
        'organization-desc': string
    };
}

export class Parking {
    title: string;
    address: IParkingAddress;
    location: IGeoLocation;
    distance: number | null;
    description?: string;
    constructor(data: Parking) {
        this.title = data.title;
        this.address = data.address;
        this.location = data.location;
        this.distance = data.distance;
        this.description = data.description;
    }
}