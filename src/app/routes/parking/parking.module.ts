import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParkingComponent } from './parking.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  { path: '', component: ParkingComponent }
];

@NgModule({
  declarations: [ParkingComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ParkingModule { }
