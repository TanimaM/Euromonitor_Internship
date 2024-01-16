import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
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
              this.router.navigate(['/emp-crud']);
            } else if (role === 'Employee') {
              this.router.navigate(['/emp-no-action']);
            }
          } else {
            this.errorMessage = 'Invalid credentials';
            console.error('Login failed: Invalid credentials');
            alert('Login failed! Please check your credentials.');
          }
        },
        error: (err) => {
          this.errorMessage = 'Invalid credentials';
          console.error('Login failed', err);
          alert('Login failed! Please check your credentials.');
        }
      });
    }
  }
  

  public logout(): void {
    this.authService.logout();
  }
}
