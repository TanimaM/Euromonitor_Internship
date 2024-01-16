import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dept-login',
  templateUrl: './dept-login.component.html',
  styleUrls: ['./dept-login.component.css']
})
export class DeptLoginComponent {
  public loginForm: FormGroup;
  public errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public submitForm(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      this.authService.login(username, password).subscribe({
        next: (user) => {
          if (user) {
            console.log('Login successful', user);
            alert('Login successful!');

            const role = this.authService.getAuthenticatedUserRole();
  
            if (role === 'Admin') {
              this.router.navigate(['/dept-crud']);
            } else if (role === 'Employee') {
              this.router.navigate(['/dept-no-action']);
            }
          } else {
            this.errorMessage = 'Invalid credentials';
            console.error('Login failed: Invalid credentials');
            alert('Login failed! Please check your credentials.');
          }
        },
        error: (error) => {
          this.errorMessage = 'Invalid credentials';
          console.error('Login failed', error);
          alert('Login failed! Please check your credentials.');
        }
      });
    }
  }
  

  public logout(): void {
    this.authService.logout();
  }
}
