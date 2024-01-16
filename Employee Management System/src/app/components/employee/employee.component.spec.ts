import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponent } from './employee.component';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeComponent],
    });

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    component.employee = {
      id: 1,
      FirstName: 'John',
      LastName: 'Doe',
      Email: 'john.doe@example.com',
      PhoneNumber: '123-456-7890',
      Department: 'IT',
      JobTitle: 'Developer',
      HireDate: '2022-01-01',
      TerminationDate: null,
      IsActive: true,
      CreatedAt: '2022-01-01T12:00:00',
      UpdatedAt: '2022-01-01T12:00:00',
      photo: 'path/to/photo',
      appraisal: 'Excellent',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onRemoveEmployee event when deleteEmployeeClicked is called', () => {
    let emittedEmployeeId: number | undefined;
    component.onRemoveEmployee.subscribe((id) => (emittedEmployeeId = id));
    component.deleteEmployeeClicked();
    expect(emittedEmployeeId).toBe(component.employee.id);
  });

  it('should emit onEditEmployee event when editEmployeeClicked is called', () => {
    let emittedEmployeeId: number | undefined;
    component.onEditEmployee.subscribe((id) => (emittedEmployeeId = id));
    component.editEmployeeClicked();
    expect(emittedEmployeeId).toBe(component.employee.id);
  });
});
