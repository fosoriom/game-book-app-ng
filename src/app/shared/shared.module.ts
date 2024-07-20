import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    Error404PageComponent,
    FooterComponent
    
    
  ],
  imports:[
    MaterialModule
  ],
  exports:[Error404PageComponent,FooterComponent]
})
export class SharedModule { }
