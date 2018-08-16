import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePlatformComponent } from './insurance-platform.component';

describe('UnifyingPlatformComponent', () => {
  let component: InsurancePlatformComponent;
  let fixture: ComponentFixture<InsurancePlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancePlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
