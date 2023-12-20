import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pp2Component } from './pp2.component';

describe('Pp2Component', () => {
  let component: Pp2Component;
  let fixture: ComponentFixture<Pp2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pp2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
