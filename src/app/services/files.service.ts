import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileImage } from '../shared/interfaces/file.interface';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  constructor() { }

  uploadFile(file: File, id: string): Observable<FileImage>{
    const url = `${this.baseUrl}/api/files`
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

     return  this.http.post<FileImage>(url,formData);


  }
}
