import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public editUser: User;
  constructor(private login: LoginService, private userService: UserService,  private router:Router) { }

  ngOnInit(): void {
    this.getUser(this.login.getUser().userCode);
  }

  public getUser(userCode: string): void {
    this.userService.getUser(userCode).subscribe(
      (response: User) => {
        this.user = response;
        console.log(this.user);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateUser(userData: User): void {
    this.userService.updateUser(userData).subscribe(
      (response: User) => {
        console.log(response);    
        window.location.reload();      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
    if (mode === 'edit') {
      this.editUser = this.login.getUser();
      button.setAttribute('data-target', '#updateUserModal');
    }
    
    container.appendChild(button);
    button.click();
  }

}
