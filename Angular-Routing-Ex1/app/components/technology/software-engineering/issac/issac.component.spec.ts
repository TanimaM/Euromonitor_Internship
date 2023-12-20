import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssacComponent } from './issac.component';

describe('IssacComponent', () => {
  let component: IssacComponent;
  let fixture: ComponentFixture<IssacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
