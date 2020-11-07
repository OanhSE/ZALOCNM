import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassUserComponent } from './edit-pass-user.component';

describe('EditPassUserComponent', () => {
  let component: EditPassUserComponent;
  let fixture: ComponentFixture<EditPassUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPassUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPassUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
