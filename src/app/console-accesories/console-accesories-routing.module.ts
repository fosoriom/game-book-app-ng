import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsoleAccesoryLayoutComponent } from './pages/console-accesory-layout/console-accesory-layout.component';

const routes: Routes = [
  {
    path:'',component:ConsoleAccesoryLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleAccesoriesRoutingModule { }
