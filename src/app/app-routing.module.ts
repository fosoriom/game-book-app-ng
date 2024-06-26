import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './auth/guards';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { DashboardLayoutsComponent } from './dashboard/layouts/dashboard-layouts/dashboard-layouts.component';

import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { CompanyLayoutComponent } from './companies/layouts/company-layout/company-layout.component';
import { CompanyListComponent } from './companies/pages/company-list/company-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [isNotAuthenticatedGuard],
    component: LoginPageComponent
    //loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'register',
    canActivate: [isNotAuthenticatedGuard],
    component: RegisterPageComponent
    //loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'companies',
    canActivate: [isAuthenticatedGuard],

    loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule)
  },
  {
    path: 'categories',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'video-consoles',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./video-consoles/video-consoles.module').then(m => m.VideoConsolesModule)
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
