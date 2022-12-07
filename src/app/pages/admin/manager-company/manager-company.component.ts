import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { Company } from 'src/app/model/Company';

@Component({
  selector: 'app-manager-company',
  templateUrl: './manager-company.component.html',
  styleUrls: ['./manager-company.component.css']
})
export class ManagerCompanyComponent implements OnInit {
  public companies: Company[];
  public editCompany: Company;
  public deleteCompany: Company;

  constructor(private companyService: CompanyService, private snack:MatSnackBar){}

  ngOnInit() {
    this.getAllCompany();
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

  public onAddCompany(addForm: NgForm): void {
    document.getElementById('add-company-form').click();
    this.companyService.addCompany(addForm.value).subscribe(
      (response: Company) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Thêm công ty thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllCompany();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.snack.open("Đăng ký thất bại", "Đóng", {
          duration: 2000,
          verticalPosition: "top",
         });
        addForm.reset();
      }
    );
  }

  public onUpdateCompany(company: Company): void {
    this.companyService.updateCompany(company).subscribe(
      (response: Company) => {
        console.log(response);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Cập nhật thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllCompany();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCompany(id: number): void {
    this.companyService.deleteCompany(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllCompany();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCompanies(key: string): void {
    console.log(key);
    const results: Company[] = [];
    for (const company of this.companies) {
      if (company.company_name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(company);
      }
    }
    this.companies = results;
    if (results.length === 0 || !key) {
      this.getAllCompany();
    }
  }

  public onOpenModal(company: Company, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCompanyModal');
    }
    if (mode === 'edit') {
      this.editCompany = company;
      button.setAttribute('data-target', '#updateCompanyModal');
    }
    if (mode === 'delete') {
      this.deleteCompany = company;
      button.setAttribute('data-target', '#deleteCompanyModal');
    }
    container.appendChild(button);
    button.click();
  }

}
