import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/model/Job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-student',
  templateUrl: './job-student.component.html',
  styleUrls: ['./job-student.component.css']
})
export class JobStudentComponent implements OnInit {
  public jobs: Job[];
  public detailJob: Job;
  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.getAllJob();
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

  public onOpenModal(job: Job, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'detail') {
      this.detailJob = job;
      button.setAttribute('data-target', '#detailJobModal');
    }
    container.appendChild(button);
    button.click();
  }

  public searchJobs(key: string): void {
    console.log(key);
    const results: any[] = [];
    for (const job of this.jobs) {
      if (job.language.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          job.company.company_name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(job);
      }
    }
    this.jobs = results;
    if (!key) {
      this.getAllJob();
    }
  }
}
