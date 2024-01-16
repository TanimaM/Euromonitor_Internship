import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: Router, useValue: routerSpyObj }],
      imports: [RouterTestingModule, MatCardModule],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /login when calling navigateToEmployeeLogin', () => {
    component.navigateToEmployeeLogin();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to /dept-login when calling navigateToDepartmentLogin', () => {
    component.navigateToDepartmentLogin();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dept-login']);
  });
});
