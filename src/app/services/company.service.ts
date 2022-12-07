import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../model/Company';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }

  public getAllCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(`${baseUrl}/company/all`);
  }

  public addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${baseUrl}/company/create`, company);
  }

  public updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${baseUrl}/company/update`, company);
  }

  public deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/company/delete/${id}`);
  }
}
