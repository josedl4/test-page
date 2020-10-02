import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { routes } from '@routes/routes';
import { MainComponent } from '@routes/main/main.component';
import { SharedModule } from '@shared/shared.module';
import { ParkingService } from './parking/parking.service';
@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    ParkingService
  ],
  exports: [RouterModule]
})
export class RoutesModule {
  constructor() { }
}
