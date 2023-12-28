import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'authToken';
  private isLogged = false;
  private authenticatedUserId: number | null = null;

  constructor(private userService: UserService, private router: Router) {
    this.isLogged = this.isAuthenticatedUser();
    if (this.isLogged) {
      this.authenticatedUserId = this.getAuthenticatedUserId();
    }
  }

 public login(username: string, password: string): Observable<any> {
    return this.userService.getUserByUsernameAndPassword(username, password)
      .pipe(
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
    this.authenticatedUserId = user.id;
  }

  public handleError(error: any): void {
    this.logout();
    throw error;
  }

  public logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.isLogged = false;
    this.authenticatedUserId = null;
    this.router.navigate(['/login']);
  }

  public isAuthenticatedUser(): boolean {
    return localStorage.getItem(this.AUTH_KEY) !== null;
  }

  public getAuthenticatedUserId(): number | null {
    const authData = localStorage.getItem(this.AUTH_KEY);
    if (authData) {
      const user = JSON.parse(authData);
      return user.id;
    }
    return null;
  }
}
