import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate():boolean {
    const isAuthenticated = this.authService.isAuthenticatedUser();
    const currentRoute = this.router.url;

    if (!isAuthenticated) {
      if (currentRoute.includes('/emp-crud')) {
        this.router.navigate(['/login']);
      } else if (currentRoute.includes('/dept-crud')) {
        this.router.navigate(['/dept-login']);
      }
      return false;
    }

    return true;
  }
}
