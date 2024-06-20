import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { DashboardLayoutsComponent } from './dashboard/layouts/dashboard-layouts/dashboard-layouts.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { RouterModule } from '@angular/router';
import { CompanyLayoutComponent } from './companies/layouts/company-layout/company-layout.component';
import { CompaniesModule } from './companies/companies.module';
import { CompanyCreateComponent } from './companies/pages/company-create/company-create.component';
import { CompanyListComponent } from './companies/pages/company-list/company-list.component';
import { CustomSidenavComponent } from './shared/components/custom-sidenav/custom-sidenav.component';
import { CategoryCreateComponent } from './categories/pages/category-create/category-create.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardLayoutsComponent,
    CompanyLayoutComponent,
    CompanyCreateComponent,
    CompanyListComponent,
    CustomSidenavComponent,
    CategoryCreateComponent
    
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
