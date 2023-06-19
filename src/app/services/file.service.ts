import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  
  constructor(private http: HttpClient) { }

  //Định nghĩa function upload file
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${baseUrl}/file/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  //Định nghĩa function download file
  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${baseUrl}/file/download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
}
