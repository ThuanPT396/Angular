import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppmenuClinicComponent } from './appmenu-clinic.component';

describe('AppmenuClinicComponent', () => {
  let component: AppmenuClinicComponent;
  let fixture: ComponentFixture<AppmenuClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppmenuClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppmenuClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
