import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Company } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  public addCompany(name: string, foundationYear: string, userId: string): Observable<Company> {
    const url = `${this.baseUrl}/api/companies`
    const token = localStorage.getItem('token')
    const body = {
      name,
      foundationYear,
      userId:userId
    };
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.post<Company>(url, body, { headers });

  }
  public updateCompany(company : Company): Observable<Company> {
    const url = `${this.baseUrl}/api/companies/${company.id}`
    const token = localStorage.getItem('token')
    const body = {
      name: company.name,
      foundationYear: company.foundationYear,
      urlImage: company.urlImage,
      
    };
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.patch<Company>(url, body, { headers });
  }

  public getCompanies(): Observable<Company[]> {


    const url = `${this.baseUrl}/api/companies`
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<Company[]>(url, { headers });
  }

}
