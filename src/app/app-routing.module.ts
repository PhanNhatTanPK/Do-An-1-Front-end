import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { ManagerCompanyComponent } from './pages/admin/manager-company/manager-company.component';
import { ManagerJobComponent } from './pages/admin/manager-job/manager-job.component';
import { ManagerNewComponent } from './pages/admin/manager-new/manager-new.component';
import { ManagerStudentComponent } from './pages/admin/manager-student/manager-student.component';
import { ManagerTeacherComponent } from './pages/admin/manager-teacher/manager-teacher.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentComponent } from './pages/student/student/student.component';
import { TeacherComponent } from './pages/teacher/teacher/teacher.component';
import { AdminGuard } from './services/admin.guard';
import { StudentGuard } from './services/student.guard';
import { TeacherGuard } from './services/teacher.guard';

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
    ]
  },
  {
    path: 'student',
    component: StudentComponent,
    pathMatch: 'full',
    canActivate: [StudentGuard],
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    pathMatch: 'full',
    canActivate: [TeacherGuard],
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
