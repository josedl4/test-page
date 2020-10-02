import { LayoutComponent } from '@layout/layout.component';
import { MainComponent } from '@routes/main/main.component';

export const routes = [
    {
        path: 'home',
        component: LayoutComponent,
        children: [
            { path: 'main', component: MainComponent },
            { path: 'weather', loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule) },
            { path: 'parking', loadChildren: () => import('./parking/parking.module').then(m => m.ParkingModule) },

            // Not found
            { path: '**', redirectTo: 'main' }
        ]
    },

    // Not found
    { path: '**', redirectTo: 'home' }
];
