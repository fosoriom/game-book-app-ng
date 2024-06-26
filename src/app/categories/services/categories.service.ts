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

    return this.http.get<Category[]>(url);

  }
    
  
  public addCategory(name:string, userId:string){
    const url = `${this.baseUrl}/api/categories`
    
    const body = {
      name,
      userId
    };

  return this.http.post<Category>(url, body); 
  }

  public updateCategory(category:Category): Observable<Category> {
    const url = `${this.baseUrl}/api/categories/${category.id}`
    
    const body = {
      name:category.name
    };
    return this.http.patch<Category>(url, body); 
  }
}
