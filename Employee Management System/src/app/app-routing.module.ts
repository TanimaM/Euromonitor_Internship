import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmpCrudComponent } from './components/emp-crud/emp-crud.component';
import { EmpNoActionComponent } from './components/emp-no-action/emp-no-action.component';
import { DeptLoginComponent } from './components/dept-login/dept-login.component'; 
import { DeptNoActionComponent } from './components/dept-no-action/dept-no-action.component'; 
import { DeptCrudComponent } from './components/dept-crud/dept-crud.component'; 
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'emp-crud', component: EmpCrudComponent, canActivate: [AuthGuard] },
  { path: 'emp-no-action', component: EmpNoActionComponent, canActivate: [AuthGuard] },
  { path: 'dept-login', component: DeptLoginComponent },
  { path: 'dept-no-action', component: DeptNoActionComponent, canActivate: [AuthGuard] },
  { path: 'dept-crud', component: DeptCrudComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
