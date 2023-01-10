import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { Company } from 'src/app/model/Company';
import { Job } from 'src/app/model/Job';
import { CompanyService } from 'src/app/services/company.service';
import { LoginService } from 'src/app/services/login.service';
import { JobService } from 'src/app/services/job.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-manager-job',
  templateUrl: './manager-job.component.html',
  styleUrls: ['./manager-job.component.css']
})
export class ManagerJobComponent implements OnInit {

  public jobs: Job[];
  public editJob: Job;
  public detailJob: Job;
  public deleteJob: Job;
  public companyList: Company[];
  public company: Company;
  public Editor = ClassicEditor;

  constructor(private jobService: JobService, public companyService:CompanyService, public loginService: LoginService, private snack:MatSnackBar){}

  ngOnInit() {
    this.getAllJob();
    this.getAllCompany();
    
  }

  public getAllJob(): void {
    this.jobService.getAllJob().subscribe(
      (response: Job[]) => {
        this.jobs = response;
        console.log(this.jobs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public getAllCompany(): void {
    this.companyService.getAllCompany().subscribe(
      (response: Company[]) => {
        this.companyList = response;
        console.log(this.companyList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.snack.open("Có lỗi xảy ra! Không lấy được thông tin", "Đóng", {
          duration: 2000,
          verticalPosition: "top",
         });
      }
    );
  }
  
  public onAddJob(addForm: NgForm): void {
    document.getElementById('add-job-form').click();
    this.jobService.addJob(addForm.value).subscribe(
      (response: Job) => {
        console.log(response); 
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Thêm thông tin thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllJob();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.snack.open("Thêm thông tin thất bại", "Đóng", {
          duration: 2000,
          verticalPosition: "top",
         });
        addForm.reset();
      }
    );
  }

  public onUpdateJob(job: Job): void {
    this.jobService.updateJob(job).subscribe(
      (response: Job) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Cập nhật thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllJob();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.snack.open("Cập nhật thất bại", "Đóng", {
          duration: 2000,
          verticalPosition: "top",
         });
      }
    );
  }

  public onDeleteJob(id: number): void {
    this.jobService.deleteJob(id).subscribe(
      (response: void) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Xóa thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllJob();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.snack.open("Xóa thất bại", "Đóng", {
          duration: 2000,
          verticalPosition: "top",
         });
      }
    );
  }

  public searchJobs(key: string): void {
    console.log(key);
    const results: any[] = [];
    for (const job of this.jobs) {
      if (job.language.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(job);
      }
    }
    this.jobs = results;
    if (!key) {
      this.getAllJob();
    }
  }

  public onOpenModal(job: Job, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addJobModal');
    }
    if (mode === 'edit') {
      this.editJob = job;
      button.setAttribute('data-target', '#updateJobModal');
    }
    if (mode === 'detail') {
      this.detailJob = job;
      button.setAttribute('data-target', '#detailJobModal');
    }
    if (mode === 'delete') {
      this.deleteJob = job;
      button.setAttribute('data-target', '#deleteJobModal');
    }
    container.appendChild(button);
    button.click();
  }

}
