import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { New } from 'src/app/model/New';
import { NewService } from 'src/app/services/new.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-manager-new',
  templateUrl: './manager-new.component.html',
  styleUrls: ['./manager-new.component.css']
})
export class ManagerNewComponent implements OnInit {
  
  public Editor = ClassicEditor;
  public news: New[];
  public editNew: New;
  public detailNew: New;
  public deleteNew: New;
  public adminData: User[];


  constructor(private newService: NewService, private userService: UserService, private snack:MatSnackBar){}

  ngOnInit() {
    this.getAllNew();
    this.getInfoAdmin();
  }

  public getInfoAdmin(): void {
    this.userService.getInfoAdmin().subscribe(
      (response: User[]) => {
        this.adminData = response;
        console.log(this.news);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllNew(): void {
    this.newService.getAllNew().subscribe(
      (response: New[]) => {
        this.news = response;
        console.log(this.news);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddNew(addForm: NgForm): void {
    document.getElementById('add-new-form').click();
    this.newService.addNew(addForm.value).subscribe(
      (response: New) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Thêm tin tức thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllNew();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snack.open("Thêm tin tức thất bại", "Đóng", {
        duration: 2000,
        verticalPosition: "top",
       });
        addForm.reset();
      }
    );
  }

  public onUpdateNew(newData: New): void {
    this.newService.updateNew(newData).subscribe(
      (response: New) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Cập nhật thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllNew();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteNew(id: number): void {
    this.newService.deleteNew(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllNew();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchNews(key: string): void {
    console.log(key);
    const results: New[] = [];
    for (const newData of this.news) {
      if (newData.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          newData.short_description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(newData);
      }
    }
    this.news = results;
    if (!key) {
      this.getAllNew();
    }
  }

  public onOpenModal(newData: New, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addNewModal');
    }
    if (mode === 'edit') {
      this.editNew = newData;
      button.setAttribute('data-target', '#updateNewModal');
    }
    if (mode === 'detail') {
      this.detailNew = newData;
      button.setAttribute('data-target', '#detailNewModal');
    }
    if (mode === 'delete') {
      this.deleteNew = newData;
      button.setAttribute('data-target', '#deleteNewModal');
    }
    container.appendChild(button);
    button.click();
  }


}
