import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleAccesoriesRoutingModule } from './console-accesories-routing.module';
import { ConsoleAccesoryLayoutComponent } from './pages/console-accesory-layout/console-accesory-layout.component';
import { ConsoleAccesoryCreateComponent } from './pages/console-accesory-create/console-accesory-create.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConsoleAccesoriesRoutingModule
  ]
})
export class ConsoleAccesoriesModule { }
