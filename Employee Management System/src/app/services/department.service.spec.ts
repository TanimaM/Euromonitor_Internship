import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DepartmentService } from './department.service';
import { Department } from '../models/department.model';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    configureTestingModule();
    service = TestBed.inject(DepartmentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    testShouldBeCreated(service);
  });

  it('should get departments', () => {
    const mockDepartments: Department[] = [
      { departmentName: 'IT', description: 'Information Technology', id: 1 },
      { departmentName: 'HR', description: 'Human Resource', id: 2 },
    ];

    testShouldGetDepartments(service, httpTestingController, mockDepartments);
  });

  it('should post a new department', () => {
    const mockDepartment: Department = { departmentName: 'IT', description: 'Information Technology', id: 1 };

    testShouldPostDepartment(service, httpTestingController, mockDepartment);
  });

  it('should delete a department', () => {
    const mockId = 1;

    testShouldDeleteDepartment(service, httpTestingController, mockId);
  });
});

function configureTestingModule() {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [DepartmentService],
  });
}

function testShouldBeCreated(service: DepartmentService) {
  expect(service).toBeTruthy();
}

function testShouldGetDepartments(service: DepartmentService, httpTestingController: HttpTestingController, mockDepartments: Department[]) {
  service.getDepartments().subscribe((departments) => {
    expect(departments).toEqual(mockDepartments);
  });

  const req = httpTestingController.expectOne('http://localhost:3000/departments');
  expect(req.request.method).toEqual('GET');

  req.flush(mockDepartments);
}

function testShouldPostDepartment(service: DepartmentService, httpTestingController: HttpTestingController, mockDepartment: Department) {
  service.postDepartment(mockDepartment).subscribe((department) => {
    expect(department).toEqual(mockDepartment);
  });

  const req = httpTestingController.expectOne('http://localhost:3000/departments');
  expect(req.request.method).toEqual('POST');
  expect(req.request.body).toEqual(mockDepartment);

  req.flush(mockDepartment);
}

function testShouldDeleteDepartment(service: DepartmentService, httpTestingController: HttpTestingController, mockId: number) {
  service.deleteDepartment(mockId).subscribe();

  const req = httpTestingController.expectOne(`http://localhost:3000/departments/${mockId}`);
  expect(req.request.method).toEqual('DELETE');

  req.flush({});
}
