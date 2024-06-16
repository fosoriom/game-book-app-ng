import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyLayoutComponent } from './layouts/company-layout/company-layout.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyCreateComponent } from './pages/company-create/company-create.component';

const routes: Routes = [
  {
    path:'',
    component:CompanyLayoutComponent,
    children :[
      {
        path:'list',component:CompanyListComponent
      },
      {
        path:'create',component:CompanyCreateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
