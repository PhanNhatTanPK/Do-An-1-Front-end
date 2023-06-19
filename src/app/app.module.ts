import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { ManagerCompanyComponent } from './pages/admin/manager-company/manager-company.component';
import { ManagerJobComponent } from './pages/admin/manager-job/manager-job.component';
import { ManagerNewComponent } from './pages/admin/manager-new/manager-new.component';
import { ManagerStudentComponent } from './pages/admin/manager-student/manager-student.component';
import { ManagerTeacherComponent } from './pages/admin/manager-teacher/manager-teacher.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { authInterceptorProviders } from './services/auth.interceptor';
import { StudentComponent } from './pages/student/student/student.component';
import { TeacherComponent } from './pages/teacher/teacher/teacher.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SidebarStudentComponent } from './pages/student/sidebar-student/sidebar-student.component';
import { JobStudentComponent } from './pages/student/job-student/job-student.component';
import { NewStudentComponent } from './pages/student/new-student/new-student.component';
import { RegisterInternshipComponent } from './pages/student/register-internship/register-internship.component';
import { ReportComponent } from './pages/student/report/report.component';
import { SidebarTeacherComponent } from './pages/teacher/sidebar-teacher/sidebar-teacher.component';
import { ViewReportComponent } from './pages/teacher/view-report/view-report.component';
import { NewTeacherComponent } from './pages/teacher/new-teacher/new-teacher.component';
import { AssessComponent } from './pages/teacher/assess/assess.component';
import { StatisticComponent } from './pages/admin/statistic/statistic.component';
import { ManagerInternComponent } from './pages/admin/manager-intern/manager-intern.component';
import { FileComponent } from './pages/student/file/file.component';
import { FinalReportComponent } from './pages/teacher/final-report/final-report.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    ManagerCompanyComponent,
    ManagerJobComponent,
    ManagerNewComponent,
    ManagerStudentComponent,
    ManagerTeacherComponent,
    SidebarComponent,
    StudentComponent,
    TeacherComponent,
    ProfileComponent,
    SidebarStudentComponent,
    JobStudentComponent,
    NewStudentComponent,
    RegisterInternshipComponent,
    ReportComponent,
    SidebarTeacherComponent,
    ViewReportComponent,
    NewTeacherComponent,
    AssessComponent,
    StatisticComponent,
    ManagerInternComponent,
    FileComponent,
    FinalReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    CKEditorModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
