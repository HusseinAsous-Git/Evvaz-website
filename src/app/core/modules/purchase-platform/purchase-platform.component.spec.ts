import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePlatformComponent } from './purchase-platform.component';

describe('PurchasePlatformComponent', () => {
  let component: PurchasePlatformComponent;
  let fixture: ComponentFixture<PurchasePlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
