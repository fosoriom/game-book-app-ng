import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { ConsoleAccesory } from '../interfaces/console-accesory.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsoleAccesoriesService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly urlApi = 'api/console-accesories'
  constructor() { }

  public addConsoleAccesory(consoleAccesory: ConsoleAccesory): Observable<ConsoleAccesory> {
    const url = `${this.baseUrl}/${this.urlApi}`
    const body = {
      name: consoleAccesory.name,
      releaseDate: consoleAccesory.releaseDate,
      userId: consoleAccesory.userId,
      url: consoleAccesory.url,
      videoConsoleId: consoleAccesory.videoConsoleId
    }
    return this.http.post<ConsoleAccesory>(url, body);
  }

  public updateConsoleAccesory(consoleAccesory: ConsoleAccesory): Observable<ConsoleAccesory> {
    const url = `${this.baseUrl}/${this.urlApi}/${consoleAccesory.id}`
    const body = {
      name: consoleAccesory.name,
      releaseDate: consoleAccesory.releaseDate,
      userId: consoleAccesory.userId,
      url: consoleAccesory.url,
      videoConsoleId: consoleAccesory.videoConsoleId,
      favorite: consoleAccesory.favorite
    }
    return this.http.patch<ConsoleAccesory>(url, body);
  }
  public getConsoleAccesories(): Observable<ConsoleAccesory[]> {

    const url = `${this.baseUrl}/${this.urlApi}`
    return this.http.get<ConsoleAccesory[]>(url);
  }
}
