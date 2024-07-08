import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoGameLayoutComponent } from './pages/video-game-layout/video-game-layout.component';

const routes: Routes = [
  { path:'', component:VideoGameLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoGamesRoutingModule { }
