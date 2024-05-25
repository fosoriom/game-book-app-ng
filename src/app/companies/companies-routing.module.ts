import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyLayoutComponent } from './layouts/company-layout/company-layout.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';

const routes: Routes = [
  {
    path:'companies',
    component:CompanyLayoutComponent,
    children :[
      {
        path:'list',component:CompanyListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
