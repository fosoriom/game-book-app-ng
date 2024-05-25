import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './auth/guards';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { DashboardLayoutsComponent } from './dashboard/layouts/dashboard-layouts/dashboard-layouts.component';

import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },  
  {
    path: 'dashboard',
    canActivate:[ isAuthenticatedGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'companies',
    canActivate:[ isAuthenticatedGuard],
    loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
