import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryFriendTargetComponent } from './directory-friend-target.component';

describe('DirectoryFriendTargetComponent', () => {
  let component: DirectoryFriendTargetComponent;
  let fixture: ComponentFixture<DirectoryFriendTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoryFriendTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryFriendTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
