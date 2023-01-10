import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/model/Company';
import { User } from 'src/app/model/User';
import { CompanyService } from 'src/app/services/company.service';
import { ExportService } from 'src/app/services/export.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  public numberStudent: number;
  public numberTeacher: number;
  public numberCompany: number;
  public students: User[];
  public companies: Company[];
  public teachers: User[];

  constructor(private statisticService: ExportService, private userService: UserService, 
              private companyService: CompanyService, private exportService: ExportService) { }

  ngOnInit(): void {
    this.getNumberTeacher();
    this.getNumberStudent();
    this.getNumberCompany();
    this.getAllStudent();
    this.getAllCompany();
    this.getAllTeacher();
  }

  public getNumberTeacher(): void {
    this.statisticService.getNumberTeacher().subscribe(
      (response: number) => {
        this.numberTeacher = response;
        console.log(this.numberTeacher);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getNumberStudent(): void {
    this.statisticService.getNumberStudent().subscribe(
      (response: number) => {
        this.numberStudent = response;
        console.log(this.numberStudent);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getNumberCompany(): void {
    this.statisticService.getNumberCompany().subscribe(
      (response: number) => {
        this.numberCompany = response;
        console.log(this.numberCompany);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public getAllStudent():void {
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

  public getAllCompany(): void {
    this.companyService.getAllCompany().subscribe(
      (response: Company[]) => {
        this.companies = response;
        console.log(this.companies);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      });
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

  exportTeacher(){
    this.exportService.exportTeacher().subscribe(x => {
      const blob = new Blob([x], {type: 'application/vnd.ms-excel;charset=UTF-8'});
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data; 
      link.download = 'Teacher.xlsx';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      console.log(data);
      setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

  exportStudent(){
    this.exportService.exportStudent().subscribe(x => {
      const blob = new Blob([x], {type: 'application/vnd.ms-excel;charset=UTF-8'});
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data; 
      link.download = 'Student.xlsx';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      console.log(data);
      setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

  exportCompany(){
    this.exportService.exportCompany().subscribe(x => {
      const blob = new Blob([x], {type: 'application/vnd.ms-excel;charset=UTF-8'});
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data; 
      link.download = 'Company.xlsx';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      console.log(data);
      setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

  exportResult(){
    this.exportService.exportResult().subscribe(x => {
      const blob = new Blob([x], {type: 'application/vnd.ms-excel;charset=UTF-8'});
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data; 
      link.download = 'Result.xlsx';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      console.log(data);
      setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }
}
