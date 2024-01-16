import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DeptLoginComponent } from './dept-login.component';
import { AuthService } from 'src/app/services/auth.service';

describe('DeptLoginComponent', () => {
  let component: DeptLoginComponent;
  let fixture: ComponentFixture<DeptLoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login', 'logout', 'getAuthenticatedUserRole']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DeptLoginComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpyObj }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptLoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty values', () => {
    testInitializeLoginForm(component);
  });

  it('should show error message on invalid form submission', () => {
    testShowErrorMessageOnInvalidSubmission(component);
  });

  it('should navigate to /dept-crud for Admin role', () => {
    testNavigateToDeptCrud(component, authServiceSpy, routerSpy);
  });

  it('should navigate to /dept-no-action for Employee role', () => {
    testNavigateToDeptNoAction(component, authServiceSpy, routerSpy);
  });

  it('should show error message on invalid credentials', () => {
    testShowErrorMessageOnInvalidCredentials(component, authServiceSpy);
  });

  it('should handle login error', () => {
    testHandleLoginError(component, authServiceSpy);
  });

  it('should call logout method on logout', () => {
    testLogoutMethod(component, authServiceSpy);
  });
});

function testInitializeLoginForm(component: DeptLoginComponent): void {
  expect(component.loginForm.value).toEqual({ username: '', password: '' });
}

function testShowErrorMessageOnInvalidSubmission(component: DeptLoginComponent): void {
  component.submitForm();
  expect(component.errorMessage).toBeNull();
}

function testNavigateToDeptCrud(
  component: DeptLoginComponent,
  authServiceSpy: jasmine.SpyObj<AuthService>,
  routerSpy: jasmine.SpyObj<Router>
): void {
  authServiceSpy.login.and.returnValue(of({ username: 'admin', role: 'Admin' }));
  authServiceSpy.getAuthenticatedUserRole.and.returnValue('Admin');

  component.loginForm.setValue({ username: 'admin', password: 'password' });
  component.submitForm();

  expect(authServiceSpy.login).toHaveBeenCalledWith('admin', 'password');
  expect(routerSpy.navigate).toHaveBeenCalledWith(['/dept-crud']);
}

function testNavigateToDeptNoAction(
  component: DeptLoginComponent,
  authServiceSpy: jasmine.SpyObj<AuthService>,
  routerSpy: jasmine.SpyObj<Router>
): void {
  authServiceSpy.login.and.returnValue(of({ username: 'employee', role: 'Employee' }));
  authServiceSpy.getAuthenticatedUserRole.and.returnValue('Employee');

  component.loginForm.setValue({ username: 'employee', password: 'password' });
  component.submitForm();

  expect(authServiceSpy.login).toHaveBeenCalledWith('employee', 'password');
  expect(routerSpy.navigate).toHaveBeenCalledWith(['/dept-no-action']);
}

function testShowErrorMessageOnInvalidCredentials(
  component: DeptLoginComponent,
  authServiceSpy: jasmine.SpyObj<AuthService>
): void {
  authServiceSpy.login.and.returnValue(of(null));

  component.loginForm.setValue({ username: 'invalid', password: 'invalid' });
  component.submitForm();

  expect(component.errorMessage).toBe('Invalid credentials');
}

function testHandleLoginError(component: DeptLoginComponent, authServiceSpy: jasmine.SpyObj<AuthService>): void {
  const err = new Error('Error');
  authServiceSpy.login.and.returnValue(throwError(() => err));

  component.loginForm.setValue({ username: 'admin', password: 'password' });
  component.submitForm();

  expect(component.errorMessage).toBe('Invalid credentials');
}

function testLogoutMethod(component: DeptLoginComponent, authServiceSpy: jasmine.SpyObj<AuthService>): void {
  component.logout();
  expect(authServiceSpy.logout).toHaveBeenCalled();
}
