import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData ={
    userCode: "",
    password: ""
  };
  constructor(private loginService: LoginService, private snack:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.userCode == "" || this.loginData.userCode == null) {
      this.snack.open("Bạn chưa nhập mã sinh viên", "Đóng", {
        duration: 2000,
        verticalPosition:"top",
      });
      return;
    } 
    if(this.loginData.password == "" || this.loginData.password == null) {
      this.snack.open("Bạn chưa nhập mật khẩu", "Đóng", {
        duration: 2000,
        verticalPosition:"top",
      });
      return;
    } 
    // Tạo token và đăng nhập
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        // Đăng nhập
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any) => {
            this.loginService.setUser(user);
            console.log(user);                      
            // Điều hướng UI ADMIN
            if(this.loginService.getUserRole() == 'ADMIN') {
              // window.location.href = '/admin';
             this.router.navigate(['admin']);
             this.loginService.loginStatus.next(true);
            }
            // Điều hướng UI USER
            else if(this.loginService.getUserRole() == 'USER') {
              this.router.navigate(['student']);
              this.loginService.loginStatus.next(true);
            }
            // Điều hướng UI TEACHER
            else if(this.loginService.getUserRole() == 'TEACHER') {            
              this.router.navigate(['teacher']);
              this.loginService.loginStatus.next(true);
            }
            else {
              this.loginService.logout();
            }
          }
        );
      },
      (error:any) => {
        console.log("error");
        console.log(error);
      }
    );
  }
}
