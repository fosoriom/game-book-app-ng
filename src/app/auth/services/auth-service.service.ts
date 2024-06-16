import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, tap, map, pipe, catchError, throwError, of } from 'rxjs';
import { User, AuthStatus, LoginResponse, CheckTokenResponse } from '../interfaces'
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  private _currentUser = signal(<User | null>(null));
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    
    return true;
  }
  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/api/auth/login`;
    const body = { email: email, password: password }

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))
      )
  }
  register(email: string, password: string, fullName:string): Observable<boolean> {

    const url = `${this.baseUrl}/api/auth/register`;
    const body = { email: email, password: password, fullName:fullName }

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))
      )
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/api/auth/check-status`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);


    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError((error) => {
          console.log({error});
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false)
        })
      )

  }
  
  logout(){
    localStorage.removeItem('token')
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    
    
  
    }

}
