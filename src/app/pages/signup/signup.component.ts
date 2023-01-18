import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userSerive: UserService, private snack:MatSnackBar) { }

  public user = {
    userCode: '',
    fullName:'',
    password: '',
    email:'',
    address: '',
    birthday: '',
    gender: '',
    phone: '',
    profile:'',
  }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.userCode == '' || this.user.userCode == null) {
      this.snack.open("Bạn phải nhập đầy đủ thông tin", "Đóng", {
        duration: 2000,
        verticalPosition:"top",
      });
      return;
    }
     // Thêm người dùng
    this.userSerive.addStudent(this.user).subscribe(
      (data) => {
        //Thành công
        console.log(data);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Đăng ký thành công',
          showConfirmButton: false,
          timer: 1500
        })
        
      },
      // Thất bại
      (error) =>{
        console.log(error);
        this.snack.open("Đăng ký thật bại. Mã sinh viên này đã tồn tại!", "Đóng", {
        duration: 2000,
        verticalPosition: "top",
       });
      }
    )
  }

 
}

