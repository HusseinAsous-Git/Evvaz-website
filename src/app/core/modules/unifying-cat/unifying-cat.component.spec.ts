import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifyingCatComponent } from './unifying-cat.component';

describe('UnifyingCatComponent', () => {
  let component: UnifyingCatComponent;
  let fixture: ComponentFixture<UnifyingCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnifyingCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnifyingCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
