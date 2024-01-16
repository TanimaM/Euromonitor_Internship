import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserAccService } from './user-account.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'authToken';
  private isLogged = false;
  private authenticatedUserRole: string | null = null;

  constructor(private userService: UserAccService, private router: Router) {
    this.isLogged = this.isAuthenticatedUser();
    if (this.isLogged) {
      this.authenticatedUserRole = this.getAuthenticatedUserRole();
    }
  }

  public login(username: string, password: string): Observable<any> {
    return this.userService.getUserByUsernameAndPassword(username, password).pipe(
      map(user => this.handleLogin(user)),
      catchError(async (error) => this.handleError(error))
    );
  }

  public handleLogin(user: any): any {
    this.isLogged = user !== null;
    if (this.isLogged) {
      this.storeUser(user);
    } else {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  public storeUser(user: any): void {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
    this.authenticatedUserRole = user.RoleName;
  }

  public handleError(error: any): void {
    this.logout();
    throw error;
  }

  public logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.isLogged = false;
    this.authenticatedUserRole = null;
    const currentRoute = this.router.url;
    if (currentRoute.includes('/emp-crud') || currentRoute.includes('/emp-no-action')) {
      this.router.navigate(['/login']);
    } else if (currentRoute.includes('/dept-crud')|| currentRoute.includes('/dept-no-action')) {
      this.router.navigate(['/dept-login']);
    }
  }

  public getCurrentUser(): Observable<any | null> {
    const authData = localStorage.getItem(this.AUTH_KEY);
    
    if (authData) {
      const user = JSON.parse(authData);
      if (user && user.EmployeeID !== undefined) {
        return of(user);
      }
    }
    
    return of(null);
  }

  public isAuthenticatedUser(): boolean {
    return localStorage.getItem(this.AUTH_KEY) !== null;
  }

  public getAuthenticatedUserRole(): string | null {
    const authData = localStorage.getItem(this.AUTH_KEY);
    if (authData) {
      const user = JSON.parse(authData);
      return user.RoleName;
    }
    return null;
  }
}
