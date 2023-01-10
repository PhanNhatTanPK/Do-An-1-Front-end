import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { Report } from '../model/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  public getAllReport(): Observable<Report[]> {
    return this.http.get<Report[]>(`${baseUrl}/report/`);
  }

  public addReport(ReportData:Report):  Observable<Report>{
    return this.http.post<Report>(`${baseUrl}/report/`, ReportData);
  }

  public updateReport(ReportData: Report): Observable<Report> {
    return this.http.put<Report>(`${baseUrl}/report/`, ReportData);
  }

  public findReport(userCode: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${baseUrl}/report/${userCode}`);
  }

  public deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/report/${id}`);
  }
}
