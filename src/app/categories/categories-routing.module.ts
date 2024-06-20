import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryLayoutComponent } from './pages/category-layout/category-layout.component';

const routes: Routes = [
{path:'',component:CategoryLayoutComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
