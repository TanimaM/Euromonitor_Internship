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
  loginForm: FormGroup;
  errorMessage: string | null = null;

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
      this.authService.login(username, password).subscribe(
        (user) => {
          if (user) {
            console.log('Login successful', user);
            alert('Login successful!');
            this.router.navigate(['/tasks']);
          } else {
            this.errorMessage = 'Invalid credentials';
            console.error('Login failed: Invalid credentials');
            alert('Login failed! Please check your credentials.');
          }
        },
        (error) => {
          this.errorMessage = 'Invalid credentials';
          console.error('Login failed', error);
          alert('Login failed! Please check your credentials.');
        }
      );
    }
  }
  public logout(): void {
    this.authService.logout();
  }
}
