import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pp3Component } from './pp3.component';

describe('Pp3Component', () => {
  let component: Pp3Component;
  let fixture: ComponentFixture<Pp3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pp3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pp3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
