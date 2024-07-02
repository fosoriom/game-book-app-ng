import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoConsolesRoutingModule } from './video-consoles-routing.module';
import { VideoConsoleCreateComponent } from './pages/video-console-create/video-console-create.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    VideoConsolesRoutingModule,
    MaterialModule
  ]
})
export class VideoConsolesModule { }
