import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) {
    
  }

 // Thêm người dùng
 public addUser(user: any): Observable<User> {
   return this.http.post<User>(`${baseUrl}/user/register`, user)
 }

 // Thêm giảng viên
 public addTeacher(user: any): Observable<User> {
   return this.http.post<User>(`${baseUrl}/user/addTeacher`, user)
 }

 //Lấy thông tin người dùng
 public getUser(userCode: string): Observable<User> {
   return this.http.get<User>(`${baseUrl}/user/${userCode}`);
 }

 // Lấy thông tin tất cả sinh viên
 public getAllStudent(): Observable<User[]> {
   return this.http.get<User[]>(`${baseUrl}/user/student/all`);
 }

 // Lấy thông tin tất cả giảng viên
 public getAllTeacher(): Observable<User[]> {
   return this.http.get<User[]>(`${baseUrl}/user/teacher/all`);
 }

 // Cập nhật thông tin
 public updateUser(user:User): Observable<User> {
   return this.http.put<User>(`${baseUrl}/user/profile/update`, user)
 }

 // Xóa người dùng
 public deleteUser(userCode: string): Observable<void> {
   return this.http.delete<void>(`${baseUrl}/user/delete/${userCode}`);
 }
}
