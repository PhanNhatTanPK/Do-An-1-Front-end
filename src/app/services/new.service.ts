import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { New } from '../model/New';
import baseUrl from './helper';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewService {
  constructor(private http:HttpClient) { }

  public getAllNew(): Observable<New[]> {
    return this.http.get<New[]>(`${baseUrl}/new/all`);
  }

  public addNew(newData:New):  Observable<New>{
    return this.http.post<New>(`${baseUrl}/new/`, newData);
  }

  public updateNew(newData: New): Observable<New> {
    return this.http.put<New>(`${baseUrl}/new/`, newData);
  }

  public deleteNew(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/new/${id}`);
  }
}
