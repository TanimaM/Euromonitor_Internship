import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchDepartmentComponent } from './research-department.component';

describe('ResearchDepartmentComponent', () => {
  let component: ResearchDepartmentComponent;
  let fixture: ComponentFixture<ResearchDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
