import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DeptNoActionComponent } from './dept-no-action.component';
import { DepartmentService } from 'src/app/services/department.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';

@Component({ selector: 'app-header', template: '' })
class AppHeaderMockComponent {}

describe('DeptNoActionComponent', () => {
  let component: DeptNoActionComponent;
  let fixture: ComponentFixture<DeptNoActionComponent>;
  let departmentServiceSpy: jasmine.SpyObj<DepartmentService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('DepartmentService', ['getDepartments']);

    TestBed.configureTestingModule({
      declarations: [DeptNoActionComponent, AppHeaderMockComponent], 
      providers: [
        { provide: DepartmentService, useValue: spy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptNoActionComponent);
    component = fixture.componentInstance;
    departmentServiceSpy = TestBed.inject(DepartmentService) as jasmine.SpyObj<DepartmentService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch departments on initialization', () => {
    const fakeDepartments = [{ id: 1, departmentName: 'IT', description: 'Information Technology' }];
    departmentServiceSpy.getDepartments.and.returnValue(of(fakeDepartments));

    component.ngOnInit();

    expect(component.departments).toEqual(fakeDepartments);
    expect(component.departmentsToDisplay).toEqual(fakeDepartments);
  });

  it('should filter departments on search', () => {
    const fakeDepartments = [
      { id: 1, departmentName: 'IT', description: 'Information Technology' },
      { id: 2, departmentName: 'HR', description: 'Human Resources' }
    ];
    component.departments = fakeDepartments;

    const searchEvent = { target: { value: 'it' } };
    component.searchDepartments(searchEvent);

    expect(component.departmentsToDisplay).toEqual([{ id: 1, departmentName: 'IT', description: 'Information Technology' }]);
  });
});
