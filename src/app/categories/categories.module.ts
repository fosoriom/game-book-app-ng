import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryLayoutComponent } from './pages/category-layout/category-layout.component';
import { CategoryCreateComponent } from './pages/category-create/category-create.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    CategoryLayoutComponent
        
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule
  ]
})
export class CategoriesModule { }
