import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { Category } from '../interfaces/category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  constructor() { }

  getCategories():Observable<Category[]> {
    const url = `${this.baseUrl}/api/categories`
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<Category[]>(url, { headers });

  }
    
  
  public addCategory(name:string, userId:string){
    const url = `${this.baseUrl}/api/categories`
    const token = localStorage.getItem('token')
    const body = {
      name,
      userId
    };

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
  return this.http.post<Category>(url, body, { headers }); 
  }

  public updateCategory(category:Category): Observable<Category> {
    const url = `${this.baseUrl}/api/categories/${category.id}`
    const token = localStorage.getItem('token')
    const body = {
      name:category.name
    };
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    return this.http.patch<Category>(url, body, { headers }); 
  }
}
