import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoGamesRoutingModule } from './video-games-routing.module';
import { VideoGameLayoutComponent } from './pages/video-game-layout/video-game-layout.component';
import { VideoGameCreateComponent } from './pages/video-game-create/video-game-create.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VideoGamesRoutingModule
  ]
})
export class VideoGamesModule { }
