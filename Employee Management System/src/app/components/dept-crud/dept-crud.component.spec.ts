import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DeptCrudComponent } from './dept-crud.component';
import { DepartmentService } from 'src/app/services/department.service';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

@Component({ selector: 'app-header', template: '' })
class AppHeaderMockComponent {}

describe('DeptCrudComponent', () => {
  let component: DeptCrudComponent;
  let fixture: ComponentFixture<DeptCrudComponent>;
  let departmentServiceSpy: jasmine.SpyObj<DepartmentService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('DepartmentService', ['getDepartments', 'postDepartment', 'deleteDepartment']);

    TestBed.configureTestingModule({
      declarations: [DeptCrudComponent, AppHeaderMockComponent],
      providers: [
        { provide: DepartmentService, useValue: spy },
        FormBuilder
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DeptCrudComponent);
      component = fixture.componentInstance;
      departmentServiceSpy = TestBed.inject(DepartmentService) as jasmine.SpyObj<DepartmentService>;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
