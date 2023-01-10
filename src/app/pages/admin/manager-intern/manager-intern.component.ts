
import { Component, OnInit } from '@angular/core';
import { Intern } from 'src/app/model/Intern';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';
import { InternService } from 'src/app/services/intern.service';
import { Company } from 'src/app/model/Company';
import { CompanyService } from 'src/app/services/company.service';
import { ExportService } from 'src/app/services/export.service';
@Component({
  selector: 'app-manager-intern',
  templateUrl: './manager-intern.component.html',
  styleUrls: ['./manager-intern.component.css']
})
export class ManagerInternComponent implements OnInit {
  public students: User[];
  public interns: Intern[];
  public companies: Company[];
  public editIntern: Intern;
  public detailIntern: Intern;

  constructor(private snack:MatSnackBar, private userService: UserService, 
              private internService: InternService, private companyService: CompanyService,
              private exportService: ExportService) { }

  ngOnInit(): void {
    this.getAllIntern();
    this.getAllStudent();
    this.getAllCompany();
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

  public getAllCompany(): void {
    this.companyService.getAllCompany().subscribe(
      (response: Company[]) => {
        this.companies = response;
        console.log(this.companies);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllIntern(): void {
    this.internService.getAllIntern().subscribe(
      (response: Intern[]) => {
        this.interns = response;
        console.log(this.interns);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateIntern(intern: Intern): void {
    this.internService.updateIntern(intern).subscribe(
      (response: Intern) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Cập nhật thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllIntern();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public searchInterns(key: string): void {
  //   console.log(key);
  //   const results: any[] = [];
  //   for (const intern of this.interns) {
  //     if (intern.classInfo.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
  //       results.push(intern);
  //     }
  //   }
  //   this.interns = results;
  //   if (!key) {
  //     this.getAllIntern();
  //   }
  // }

  public onOpenModal(intern: Intern, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editIntern = intern;
      button.setAttribute('data-target', '#updateInternModal');
    }
    if (mode === 'detail') {
      this.detailIntern = intern;
      button.setAttribute('data-target', '#detailInternModal');
    }
    container.appendChild(button);
    button.click();
  }

  exportIntern(){
    this.exportService.exportIntern().subscribe(x => {
      const blob = new Blob([x], {type: 'application/vnd.ms-excel;charset=UTF-8'});
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data; 
      link.download = 'Intern.xlsx';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      console.log(data);
      setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }
}
