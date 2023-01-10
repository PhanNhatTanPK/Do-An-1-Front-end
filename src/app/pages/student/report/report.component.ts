import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { Report } from 'src/app/model/Report';
import { ReportService } from 'src/app/services/report.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public reports: Report[];
  public editReport: Report;
  public deleteReport: Report;
  public user: User;

  constructor(private reportService: ReportService, private snack:MatSnackBar, public loginserVice: LoginService) { }

  ngOnInit(): void {
    this.getAllReport();
    this.user = this.loginserVice.getUser();
  }

  public getAllReport(): void {
    this.reportService.findReport(this.loginserVice.getUser().userCode).subscribe(
      (response: Report[]) => {
        this.reports = response;
        console.log(this.reports);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddReport(addForm: NgForm): void {
    this.reportService.addReport(addForm.value).subscribe(
      (response: Report) => {
        console.log(response); 
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Thêm báo cáo thành công',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
        this.getAllReport();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.snack.open("Thêm báo cáo thất bại", "Đóng", {
          duration: 2000,
          verticalPosition: "top",
         });
        addForm.reset();
      }
    );
  }

  public onUpdateReport(report: Report): void {
    this.reportService.updateReport(report).subscribe(
      (response: Report) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Cập nhật thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllReport();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteReport(id: number): void {
    this.reportService.deleteReport(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllReport();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(report: Report, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addReportModal');
    }
    if (mode === 'edit') {
      this.editReport = report;
      button.setAttribute('data-target', '#updateReportModal');
    }   
    if (mode === 'delete') {
      this.deleteReport = report;
      button.setAttribute('data-target', '#deleteReportModal');
    }
    container.appendChild(button);
    button.click();
  }

}
