import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http:HttpClient) { }

  public exportTeacher(): Observable<Blob> {
    return this.http.get(`${baseUrl}/statistic/teacher/export`, {responseType: 'blob'});
  }

  public exportStudent(): Observable<Blob> {
    return this.http.get(`${baseUrl}/statistic/student/export`, {responseType: 'blob'});
  }

  public exportCompany(): Observable<Blob> {
    return this.http.get(`${baseUrl}/statistic/company/export`, {responseType: 'blob'});
  }

  public exportResult(): Observable<Blob> {
    return this.http.get(`${baseUrl}/statistic/result/export`, {responseType: 'blob'});
  }

  public exportIntern(): Observable<Blob> {
    return this.http.get(`${baseUrl}/statistic/intern/export`, {responseType: 'blob'});
  }

  public getNumberTeacher(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/statistic/teacher/`);
  }

  public getNumberStudent(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/statistic/student/`);
  }

  public getNumberCompany(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/statistic/company/`);
  }
}
