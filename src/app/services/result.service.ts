import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { Result } from '../model/Result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  public getAllResult(): Observable<Result[]> {
    return this.http.get<Result[]>(`${baseUrl}/result/`);
  }

  public addResult(Result:any) {
    return this.http.post<any>(`${baseUrl}/result/`, Result);
  }

  public updateResult(Result: Result): Observable<Result> {
    return this.http.put<Result>(`${baseUrl}/result/`, Result);
  }

  public deleteResult(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/result/${id}`);
  }
}
