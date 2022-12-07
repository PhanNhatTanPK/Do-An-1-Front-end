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
import { authInterceptorProviders } from './services/auth.interceptor';
import { StudentComponent } from './pages/student/student/student.component';
import { TeacherComponent } from './pages/teacher/teacher/teacher.component';
import { ProfileComponent } from './pages/profile/profile.component';
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
    ProfileComponent
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
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
