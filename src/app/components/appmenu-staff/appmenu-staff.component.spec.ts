import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppmenuStaffComponent } from './appmenu-staff.component';

describe('AppmenuStaffComponent', () => {
  let component: AppmenuStaffComponent;
  let fixture: ComponentFixture<AppmenuStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppmenuStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppmenuStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
