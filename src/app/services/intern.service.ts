import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { Intern } from '../model/Intern';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  constructor(private http:HttpClient) { }

  public addIntern(internData: Intern): Observable<Intern>{
    return this.http.post<Intern>(`${baseUrl}/intern/`, internData);
  }

  public updateIntern(internData:Intern): Observable<Intern> {
    return this.http.put<Intern>(`${baseUrl}/intern/`, internData);
  }

  public getAllIntern(): Observable<Intern[]> {
    return this.http.get<Intern[]>(`${baseUrl}/intern/`);
  }
}
