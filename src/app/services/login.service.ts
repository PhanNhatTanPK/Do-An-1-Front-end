import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatus = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // Lấy người dùng hiện tại
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  // Tạo token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // Đăng nhập với người dùng
  public loginUser(token: any) {
     localStorage.setItem('token', token);
     return true;
  }

  // Kiểm tra người dùng đăng nhập hay chưa
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == "" || tokenStr == null) {
      return false;
    }
    else {
      return true;
    }
  }

  // Đăng xuất: Xóa token, user khỏi localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // Lấy token
  public getToken(){
    return localStorage.getItem('token');
  }

  // Thiết lập người dùng
  public setUser(user:any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // Lấy người dùng
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  // Lấy quyền truy cập của người dùng
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
