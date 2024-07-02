import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VideoConsole } from '../interfaces/video-console.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})


export class VideoConsolesService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  constructor() { }

  public addVideoConsole(videoConsole: VideoConsole): Observable<VideoConsole> {
    const url = `${this.baseUrl}/api/video-consoles`
    const body = {
      name: videoConsole.name,
      releaseDate: videoConsole.releaseDate,
      userId: videoConsole.userId,
      url: videoConsole.url,
      companyId: videoConsole.companyId
    }
    return this.http.post<VideoConsole>(url, body);
  }
  public updateVideoConsole(videoConsole: VideoConsole): Observable<VideoConsole> {

    const url = `${this.baseUrl}/api/video-consoles/${videoConsole.id}`
    const body = {
      name: videoConsole.name,
      releaseDate: videoConsole.releaseDate,
      userId: videoConsole.userId,
      url: videoConsole.url,
      companyId: videoConsole.companyId,
      like:videoConsole.like
    }

    return this.http.patch<VideoConsole>(url, body);
  }
  public getVideoConsoles(): Observable<VideoConsole[]> {

    const url = `${this.baseUrl}/api/video-consoles`
    return this.http.get<VideoConsole[]>(url);
  }

}
