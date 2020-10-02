import { IMenuItem } from '@core/menu/menu.service';

const MainView: IMenuItem = {
    text: 'Main View',
    icon: '/assets/images/icons/home.svg',
    link: '/home/main'
};

const WeatherSection = {
    text: 'Weather',
    icon: '/assets/images/icons/weather.svg',
    link: '/home/weather'
};

const ParkingSection = {
    text: 'Parking',
    icon: '/assets/images/icons/parking.svg',
    link: '/home/parking'
};


export const menu: IMenuItem[] = [
    MainView, WeatherSection, ParkingSection
];
