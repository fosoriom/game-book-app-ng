import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Router } from '@angular/router';
import { VideoGame } from '../interfaces/video-game.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoGamesService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly urlApi = 'api/video-games'
  constructor() { }

  public addVideoGame(videoGame: VideoGame): Observable<VideoGame> {
    const url = `${this.baseUrl}/${this.urlApi}`
    const body = {
      name: videoGame.name,
      releaseDate: videoGame.releaseDate,
      userId: videoGame.userId,
      url: videoGame.url,
      videoConsoleId: videoGame.videoConsoleId
    }
    return this.http.post<VideoGame>(url, body);
  }
  public updateVideoGame(videoGame: VideoGame): Observable<VideoGame> {

    const url = `${this.baseUrl}/${this.urlApi}/${videoGame.id}`
    const body = {
      name: videoGame.name,
      releaseDate: videoGame.releaseDate,
      userId: videoGame.userId,
      url: videoGame.url,
      videoConsoleId: videoGame.videoConsoleId,
      favorite: videoGame.favorite
    }

    return this.http.patch<VideoGame>(url, body);
  }

  public getVideoGames(): Observable<VideoGame[]> {

    const url = `${this.baseUrl}/${this.urlApi}`
    return this.http.get<VideoGame[]>(url);
  }

}
