import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

function setupComponent(): [LoginComponent, ComponentFixture<LoginComponent>, jasmine.SpyObj<AuthService>, jasmine.SpyObj<Router>] {
  const authSpy = jasmine.createSpyObj('AuthService', ['login', 'logout', 'getAuthenticatedUserRole']);
  const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

  TestBed.configureTestingModule({
    imports: [ReactiveFormsModule],
    declarations: [LoginComponent],
    providers: [
      { provide: AuthService, useValue: authSpy },
      { provide: Router, useValue: routerSpyObj }
    ]
  })
  .compileComponents();

  const fixture = TestBed.createComponent(LoginComponent);
  const component = fixture.componentInstance;

  return [component, fixture, authSpy, routerSpyObj];
}

function submitValidFormAndNavigate(component: LoginComponent, authServiceSpy: jasmine.SpyObj<AuthService>, routerSpy: jasmine.SpyObj<Router>, username: string, password: string, role: string, expectedRoute: string[]) {
  authServiceSpy.login.and.returnValue(of({ username, role }));
  authServiceSpy.getAuthenticatedUserRole.and.returnValue(role);

  component.loginForm.setValue({ username, password });
  component.submitForm();

  expect(authServiceSpy.login).toHaveBeenCalledWith(username, password);
  expect(routerSpy.navigate).toHaveBeenCalledWith(expectedRoute);
}

function showErrorMessageOnInvalidCredentials(component: LoginComponent, authServiceSpy: jasmine.SpyObj<AuthService>, username: string, password: string, expectedErrorMessage: string) {
  authServiceSpy.login.and.returnValue(of(null));

  component.loginForm.setValue({ username, password });
  component.submitForm();

  expect(component.errorMessage).toBe(expectedErrorMessage);
}

function handleLoginError(component: LoginComponent, authServiceSpy: jasmine.SpyObj<AuthService>, username: string, password: string, expectedErrorMessage: string) {
  const err = new Error('Error');
  authServiceSpy.login.and.returnValue(throwError(() => err));

  component.loginForm.setValue({ username, password });
  component.submitForm();

  expect(component.errorMessage).toBe(expectedErrorMessage);
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    [component, fixture, authServiceSpy, routerSpy] = setupComponent();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form and navigate to emp-crud for Admin role', () => {
    submitValidFormAndNavigate(component, authServiceSpy, routerSpy, 'admin', 'password', 'Admin', ['/emp-crud']);
  });

  it('should submit valid form and navigate to emp-no-action for Employee role', () => {
    submitValidFormAndNavigate(component, authServiceSpy, routerSpy, 'employee', 'password', 'Employee', ['/emp-no-action']);
  });

  it('should show error message on invalid credentials', () => {
    showErrorMessageOnInvalidCredentials(component, authServiceSpy, 'invalid', 'invalid', 'Invalid credentials');
  });

  it('should handle login error', () => {
    handleLoginError(component, authServiceSpy, 'admin', 'password', 'Invalid credentials');
  });

  it('should call logout method on logout', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
