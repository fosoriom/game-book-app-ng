import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompanyLayoutComponent } from './layouts/company-layout/company-layout.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyCreateComponent } from './pages/company-create/company-create.component';


@NgModule({
  declarations: [
    CompanyLayoutComponent,
    CompanyPageComponent,
    CompanyListComponent,
    CompanyCreateComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule
  ]
})
export class CompaniesModule { }
