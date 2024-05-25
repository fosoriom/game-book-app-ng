import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutsComponent } from './layouts/dashboard-layouts/dashboard-layouts.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    DashboardLayoutsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
