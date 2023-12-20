import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pp4Component } from './pp4.component';

describe('Pp4Component', () => {
  let component: Pp4Component;
  let fixture: ComponentFixture<Pp4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pp4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pp4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
