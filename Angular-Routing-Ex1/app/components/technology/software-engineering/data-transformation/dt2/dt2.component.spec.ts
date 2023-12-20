import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dt2Component } from './dt2.component';

describe('Dt2Component', () => {
  let component: Dt2Component;
  let fixture: ComponentFixture<Dt2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dt2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
