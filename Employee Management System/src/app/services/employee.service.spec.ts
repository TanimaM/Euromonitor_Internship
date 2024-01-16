import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    testShouldBeCreated(service);
  });

  it('should get employees', () => {
    const mockEmployees: Employee[] = [
      {
        id: 1,
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'john@example.com',
        PhoneNumber: '123-456-7890',
        Department: 'IT',
        JobTitle: 'Developer',
        HireDate: '2022-01-01',
        TerminationDate: null,
        IsActive: true,
        CreatedAt: '2022-01-01',
        UpdatedAt: '2022-01-02',
        photo: 'Profile01.jpg',
        appraisal: 'john_appraisal.xlsx',
      },
    ];

    testShouldGetEmployees(service, httpTestingController, mockEmployees);
  });

  it('should update an employee', () => {
    const mockEmployee: Employee = {
      id: 1,
      FirstName: 'John',
      LastName: 'Doe',
      Email: 'john@example.com',
      PhoneNumber: '123-456-7890',
      Department: 'IT',
      JobTitle: 'Developer',
      HireDate: '2022-01-01',
      TerminationDate: null,
      IsActive: true,
      CreatedAt: '2022-01-01',
      UpdatedAt: '2022-01-02',
      photo: 'Profile01.jpg',
      appraisal: 'john_appraisal.xlsx',
    };

    testShouldUpdateEmployee(service, httpTestingController, mockEmployee);
  });

  it('should post a new employee', () => {
    const mockEmployee: Employee = {
      id: 1,
      FirstName: 'John',
      LastName: 'Doe',
      Email: 'john@example.com',
      PhoneNumber: '123-456-7890',
      Department: 'IT',
      JobTitle: 'Developer',
      HireDate: '2022-01-01',
      TerminationDate: null,
      IsActive: true,
      CreatedAt: '2022-01-01',
      UpdatedAt: '2022-01-02',
      photo: 'Profile01.jpg',
      appraisal: 'john_appraisal.xlsx',
    };

    testShouldPostEmployee(service, httpTestingController, mockEmployee);
  });

  it('should delete an employee', () => {
    const mockId = '1';

    testShouldDeleteEmployee(service, httpTestingController, mockId);
  });
});

function testShouldBeCreated(service: EmployeeService) {
  expect(service).toBeTruthy();
}

function testShouldGetEmployees(service: EmployeeService, httpTestingController: HttpTestingController, mockEmployees: Employee[]) {
  service.getEmployees().subscribe((employees) => {
    expect(employees).toEqual(mockEmployees);
  });

  const req = httpTestingController.expectOne('http://localhost:3000/employees');
  expect(req.request.method).toEqual('GET');

  req.flush(mockEmployees);
}

function testShouldUpdateEmployee(service: EmployeeService, httpTestingController: HttpTestingController, mockEmployee: Employee) {
  service.updateEmployee(mockEmployee).subscribe((employee) => {
    expect(employee).toEqual(mockEmployee);
  });

  const req = httpTestingController.expectOne(`http://localhost:3000/employees/${mockEmployee.id}`);
  expect(req.request.method).toEqual('PUT');
  expect(req.request.body).toEqual(mockEmployee);

  req.flush(mockEmployee);
}

function testShouldPostEmployee(service: EmployeeService, httpTestingController: HttpTestingController, mockEmployee: Employee) {
  service.postEmployee(mockEmployee).subscribe((employee) => {
    expect(employee).toEqual(mockEmployee);
  });

  const req = httpTestingController.expectOne('http://localhost:3000/employees');
  expect(req.request.method).toEqual('POST');
  expect(req.request.body).toEqual(mockEmployee);

  req.flush(mockEmployee);
}

function testShouldDeleteEmployee(service: EmployeeService, httpTestingController: HttpTestingController, mockId: string) {
  service.deleteEmployee(mockId).subscribe();

  const req = httpTestingController.expectOne(`http://localhost:3000/employees/${mockId}`);
  expect(req.request.method).toEqual('DELETE');

  req.flush({});
}
