import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherComponent } from './weather.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  { path: '', component: WeatherComponent }
];

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class WeatherModule { }
