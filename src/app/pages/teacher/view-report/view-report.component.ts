import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Report } from 'src/app/model/Report';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { ReportService } from 'src/app/services/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {
  public reports: Report[];
  public students: User[];

  constructor(private reportService: ReportService, private userService: UserService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.getAllStudent();
  }

  public onFindReport(userCode: string): void {
    this.reportService.findReport(userCode).subscribe(
      (response: Report[]) => {
        if(userCode != null){
          this.reports = response;
        }
        else {
          this.reports = null;
        }
      },
      (error: HttpErrorResponse) => {
        this.snack.open("Không báo cáo nào với mã sinh viên này", "Đóng", {
          duration: 2000,
          verticalPosition: "top",
         });
      }
    );
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

  
}
