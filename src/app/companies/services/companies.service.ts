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
    const body = {
      name,
      foundationYear,
      userId: userId
    };

    return this.http.post<Company>(url, body);

  }
  public updateCompany(company: Company): Observable<Company> {
    const url = `${this.baseUrl}/api/companies/${company.id}`
    const body = {
      name: company.name,
      foundationYear: company.foundationYear,
      url: company.url,
    };

    return this.http.patch<Company>(url, body);
  }

  public getCompanies(): Observable<Company[]> {

    const url = `${this.baseUrl}/api/companies`
    return this.http.get<Company[]>(url);
  }

}
