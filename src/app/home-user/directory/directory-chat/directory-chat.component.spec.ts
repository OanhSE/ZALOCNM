import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryChatComponent } from './directory-chat.component';

describe('DirectoryChatComponent', () => {
  let component: DirectoryChatComponent;
  let fixture: ComponentFixture<DirectoryChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoryChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
