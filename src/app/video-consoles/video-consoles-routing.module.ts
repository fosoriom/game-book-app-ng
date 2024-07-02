import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoConsoleLayoutComponent } from './pages/video-console-layout/video-console-layout.component';

const routes: Routes = [
  {path : '', component:VideoConsoleLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoConsolesRoutingModule { }
