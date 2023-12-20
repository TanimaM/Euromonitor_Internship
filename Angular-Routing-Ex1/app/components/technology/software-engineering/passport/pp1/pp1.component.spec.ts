import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pp1Component } from './pp1.component';

describe('Pp1Component', () => {
  let component: Pp1Component;
  let fixture: ComponentFixture<Pp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pp1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
