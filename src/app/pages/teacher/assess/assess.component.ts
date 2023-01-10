import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';
import { Result } from 'src/app/model/Result';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css']
})
export class AssessComponent implements OnInit {
  public results: Result[];
  public students: User[];
  public editResult: Result;
  public deleteResult: Result;

  constructor(private resultService: ResultService, private snack:MatSnackBar, private userService: UserService){}

  ngOnInit() {
    this.getAllResult();
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

  public getAllResult(): void {
    this.resultService.getAllResult().subscribe(
      (response: Result[]) => {
        this.results = response;
        console.log(this.results);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddResult(addForm: NgForm): void {
    document.getElementById('add-Result-form').click();
    this.resultService.addResult(addForm.value).subscribe(
      (response: Result) => {
        console.log(response); 
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Thêm đánh giá thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllResult();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.snack.open("Thêm đánh giá thất bại", "Đóng", {
          duration: 2000,
          verticalPosition: "top",
         });
        addForm.reset();
      }
    );
  }

  public onUpdateResult(result: Result): void {
    this.resultService.updateResult(result).subscribe(
      (response: Result) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Cập nhật thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllResult();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteResult(id: number): void {
    this.resultService.deleteResult(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllResult();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchResults(key: string): void {
    console.log(key);
    const results: any[] = [];
    for (const result of this.results) {
      if (result.userCode.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(result);
      }
    }
    this.results = results;
    if (!key) {
      this.getAllResult();
    }
  }

  public onOpenModal(result: Result, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addResultModal');
    }
    if (mode === 'edit') {
      this.editResult = result;
      button.setAttribute('data-target', '#updateResultModal');
    }
    if (mode === 'delete') {
      this.deleteResult = result;
      button.setAttribute('data-target', '#deleteResultModal');
    }
    container.appendChild(button);
    button.click();
  }


}
