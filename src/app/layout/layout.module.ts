import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutModule { }
