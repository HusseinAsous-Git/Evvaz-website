import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifyingPlatformComponent } from './unifying-platform.component';

describe('UnifyingPlatformComponent', () => {
  let component: UnifyingPlatformComponent;
  let fixture: ComponentFixture<UnifyingPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnifyingPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnifyingPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
