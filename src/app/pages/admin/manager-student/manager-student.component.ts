import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-manager-student',
  templateUrl: './manager-student.component.html',
  styleUrls: ['./manager-student.component.css']
})
export class ManagerStudentComponent implements OnInit {

  public students: User[];
  public editStudent: User;
  public deleteStudent: User;

  constructor(private userService: UserService, private snack:MatSnackBar, private exportService: ExportService){}

  ngOnInit() {
    this.getAllStudent();
  }

  public getAllStudent(): void {
    this.userService.getAllStudent().subscribe(
      (response: User[]) => {
        this.students = response;
        console.log(this.students);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddStudent(addForm: NgForm): void {
    document.getElementById('add-student-form').click();
    this.userService.addStudent(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Thêm sinh viên thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllStudent();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snack.open("Thêm sinh viên thất bại", "Đóng", {
        duration: 2000,
        verticalPosition: "top",
       });
        addForm.reset();
      }
    );
  }

  public onDeleteStudent(userCode: string): void {
    this.userService.deleteUser(userCode).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllStudent();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchStudents(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const student of this.students) {
      if (student.fullName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          student.userCode.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(student);
      }
    }
    this.students = results;
    if (!key) {
      this.getAllStudent();
    }
  }

  public onOpenModal(student: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addStudentModal');
    }
    if (mode === 'delete') {
      this.deleteStudent = student;
      button.setAttribute('data-target', '#deleteStudentModal');
    }
    container.appendChild(button);
    button.click();
  }

  
}
