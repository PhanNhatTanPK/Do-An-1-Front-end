import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-manager-teacher',
  templateUrl: './manager-teacher.component.html',
  styleUrls: ['./manager-teacher.component.css']
})
export class ManagerTeacherComponent implements OnInit {
  public teachers: User[];
  public deleteTeacher: User;

  constructor(private userService: UserService, private snack:MatSnackBar){}

  ngOnInit() {
    this.getAllTeacher();
  }

  public getAllTeacher(): void {
    this.userService.getAllTeacher().subscribe(
      (response: User[]) => {
        this.teachers = response;
        console.log(this.teachers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTeacher(addForm: NgForm): void {
    document.getElementById('add-teacher-form').click();
    this.userService.addTeacher(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Thêm giảng viên thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllTeacher();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snack.open("Thêm giảng viên thất bại", "Đóng", {
        duration: 2000,
        verticalPosition: "top",
       });
        addForm.reset();
      }
    );
  }

  public onDeleteTeacher(userCode: string): void {
    this.userService.deleteUser(userCode).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllTeacher();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTeachers(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const teacher of this.teachers) {
      if (teacher.fullName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ) {
        results.push(teacher);
      }
    }
    this.teachers = results;
    if (!key) {
      this.getAllTeacher();
    }
  }

  public onOpenModal(teacher: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTeacherModal');
    }
    if (mode === 'delete') {
      this.deleteTeacher = teacher;
      button.setAttribute('data-target', '#deleteTeacherModal');
    }
    container.appendChild(button);
    button.click();
  }

  
}
