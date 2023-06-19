import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { ManagerCompanyComponent } from './pages/admin/manager-company/manager-company.component';
import { ManagerInternComponent } from './pages/admin/manager-intern/manager-intern.component';
import { ManagerJobComponent } from './pages/admin/manager-job/manager-job.component';
import { ManagerNewComponent } from './pages/admin/manager-new/manager-new.component';
import { ManagerStudentComponent } from './pages/admin/manager-student/manager-student.component';
import { ManagerTeacherComponent } from './pages/admin/manager-teacher/manager-teacher.component';
import { StatisticComponent } from './pages/admin/statistic/statistic.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { JobStudentComponent } from './pages/student/job-student/job-student.component';
import { NewStudentComponent } from './pages/student/new-student/new-student.component';
import { RegisterInternshipComponent } from './pages/student/register-internship/register-internship.component';
import { ReportComponent } from './pages/student/report/report.component';
import { StudentComponent } from './pages/student/student/student.component';
import { AssessComponent } from './pages/teacher/assess/assess.component';
import { NewTeacherComponent } from './pages/teacher/new-teacher/new-teacher.component';
import { TeacherComponent } from './pages/teacher/teacher/teacher.component';
import { ViewReportComponent } from './pages/teacher/view-report/view-report.component';
import { AdminGuard } from './services/admin.guard';
import { StudentGuard } from './services/student.guard';
import { TeacherGuard } from './services/teacher.guard';
import { FileComponent } from './pages/student/file/file.component';
import { FinalReportComponent } from './pages/teacher/final-report/final-report.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path: 'managerCompany',
        component: ManagerCompanyComponent,        
      },
      {
        path: 'managerStudent',
        component: ManagerStudentComponent,
      },
      {
        path: 'managerTeacher',
        component: ManagerTeacherComponent,
      },
      {
        path: 'job',
        component: ManagerJobComponent,
      },
      {
        path: 'new',
        component: ManagerNewComponent,
      },
      {
        path: 'statistic',
        component: StatisticComponent,
      },
      {
        path: 'intern',
        component: ManagerInternComponent,
      },
    ]
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [StudentGuard],
    children:[
      {
        path: 'jobInfo',
        component: JobStudentComponent,        
      },
      {
        path: 'newInfo',
        component: NewStudentComponent,
      },
      {
        path: 'registerInternship',
        component: RegisterInternshipComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'finalReport',
        component: FileComponent,
      },
    ]
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [TeacherGuard],
    children:[
      {
        path: 'viewReport',
        component: ViewReportComponent,        
      },
      {
        path: 'newInfo',
        component: NewTeacherComponent,
      },
      {
        path: 'assess',
        component: AssessComponent,
      },
      {
        path: 'finalReport',
        component: FinalReportComponent,
      },
    ]
  },
  {
    path: 'user/profile',
    component: ProfileComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
