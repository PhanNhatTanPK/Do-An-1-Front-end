import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { MatSnackBar } from '@angular/material/snack-bar';
import { InternService } from 'src/app/services/intern.service';
import { Intern } from 'src/app/model/Intern';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/model/Company';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-register-internship',
  templateUrl: './register-internship.component.html',
  styleUrls: ['./register-internship.component.css']
})
export class RegisterInternshipComponent implements OnInit {
  public companyList: Company[];
  public students: User[];

  constructor(private internService: InternService, private companyService: CompanyService, 
              private snack:MatSnackBar, public loginService: LoginService, public userService: UserService) { }

  ngOnInit(): void {
    this.getAllCompany();
  }

  public getAllCompany(): void {
    this.companyService.getAllCompany().subscribe(
      (response: Company[]) => {
        this.companyList = response;
        console.log(this.companyList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // formSubmit(){
  //   console.log(this.internData);
  //    // Thêm người dùng
  //   this.internService.addIntern(this.internData).subscribe(
  //     (data) => {
  //       //Thành công
  //       console.log(data);
  //       Swal.fire({
  //         position: 'top',
  //         icon: 'success',
  //         title: 'Đăng ký thành công',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     },
  //     // Thất bại
  //     (error) =>{
  //       console.log(error);
  //       this.snack.open("Đăng ký thật bại. Mã sinh viên này đã tồn tại!", "Đóng", {
  //       duration: 2000,
  //       verticalPosition: "top",
  //      });
  //     }
  //   )
  // }

  public onAddNew(addForm: NgForm): void {
    console.log(addForm.value);
    this.internService.addIntern(addForm.value).subscribe(
      (response: any) => {
      console.log(response);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Đăng ký thực tập thành công',
        showConfirmButton: false,
        timer: 1500
      });
      addForm.reset();
    },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snack.open("Đăng ký thực tập thất bại", "Đóng", {
        duration: 2000,
        verticalPosition: "top",
       });
        addForm.reset();
      }
    );
  }
}
