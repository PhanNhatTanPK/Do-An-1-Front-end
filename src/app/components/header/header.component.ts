import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = true;
  user:any;
  userData: any;

  constructor(public loginService: LoginService, private userService: UserService) { }

  ngOnInit(): void {
    
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
 
    this.loginService.loginStatus.asObservable().subscribe(data => {
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser();
    });
  }

  getUserByUserCode(userCode: string): void {
    this.userService.getUser(userCode).subscribe(
      (response: User) => {
        this.userData = response;
        console.log(this.userData);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  logout() {
    this.loginService.logout();  
    window.location.reload();
  }

}
