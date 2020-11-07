import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhoneUserComponent } from './edit-phone-user.component';

describe('EditPhoneUserComponent', () => {
  let component: EditPhoneUserComponent;
  let fixture: ComponentFixture<EditPhoneUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhoneUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhoneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
