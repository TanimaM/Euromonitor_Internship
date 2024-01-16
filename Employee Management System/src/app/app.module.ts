import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeService } from './services/employee.service';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpCrudComponent } from './components/emp-crud/emp-crud.component';
import { EmpNoActionComponent } from './components/emp-no-action/emp-no-action.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { DepartmentComponent } from './components/department/department.component';
import { DeptCrudComponent } from './components/dept-crud/dept-crud.component';
import { DeptNoActionComponent } from './components/dept-no-action/dept-no-action.component';
import { DeptLoginComponent } from './components/dept-login/dept-login.component';
import { HomeComponent } from './components/home/home.component';
import { materialModules } from './materials/material-imports';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HeaderComponent,
    EmpCrudComponent,
    EmpNoActionComponent,
    LoginComponent,
    DepartmentComponent,
    DeptCrudComponent,
    DeptNoActionComponent,
    DeptLoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ...materialModules
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
