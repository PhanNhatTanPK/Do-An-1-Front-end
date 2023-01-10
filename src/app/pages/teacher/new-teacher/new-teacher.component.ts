import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { New } from 'src/app/model/New';
import { User } from 'src/app/model/User';
import { NewService } from 'src/app/services/new.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-new-teacher',
  templateUrl: './new-teacher.component.html',
  styleUrls: ['./new-teacher.component.css']
})
export class NewTeacherComponent implements OnInit {

  public news: New[];
  public detailNew: New;
  public adminData: User[];

  constructor(private newService: NewService, private userService:UserService) { }

  ngOnInit(): void {
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

  public searchNews(key: string): void {
    console.log(key);
    const results: New[] = [];
    for (const newData of this.news) {
      if (newData.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          newData.date.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
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
    if (mode === 'detail') {
      this.detailNew = newData;
      button.setAttribute('data-target', '#detailNewModal');
    }
    container.appendChild(button);
    button.click();
  }

}
