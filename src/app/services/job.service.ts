import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { Job } from '../model/Job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private http: HttpClient) { }

  public getAllJob(): Observable<Job[]> {
    return this.http.get<Job[]>(`${baseUrl}/job/all`);
  }

  public addJob(job:any) {
    return this.http.post<any>(`${baseUrl}/job/create`, job);
  }

  public updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`${baseUrl}/job/update`, job);
  }

  public deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/job/delete/${id}`);
  }
}
