import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentComponent } from './department.component';

describe('DepartmentComponent', () => {
  let component: DepartmentComponent;
  let fixture: ComponentFixture<DepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentComponent],
    });

    fixture = TestBed.createComponent(DepartmentComponent);
    component = fixture.componentInstance;
    component.department = {
      id: 1,
      departmentName: 'IT',
      description: 'Information Technology Department',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onRemoveDepartment event when deleteDepartmentClicked is called', () => {
    let emittedDepartmentId: number | undefined;
    component.onRemoveDepartment.subscribe((id) => (emittedDepartmentId = id));
    component.deleteDepartmentClicked();
    expect(emittedDepartmentId).toBe(component.department.id);
  });

  it('should emit onEditDepartment event when editDepartmentClicked is called', () => {
    let emittedDepartmentId: number | undefined;

    component.onEditDepartment.subscribe((id) => (emittedDepartmentId = id));
    component.editDepartmentClicked();
    expect(emittedDepartmentId).toBe(component.department.id);
  });
});
