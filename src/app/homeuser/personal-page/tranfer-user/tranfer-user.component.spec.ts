import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranferUserComponent } from './tranfer-user.component';

describe('TranferUserComponent', () => {
  let component: TranferUserComponent;
  let fixture: ComponentFixture<TranferUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranferUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranferUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
