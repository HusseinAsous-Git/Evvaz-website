import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPlatformComponent } from './offer-platform.component';

describe('OfferPlatformComponent', () => {
  let component: OfferPlatformComponent;
  let fixture: ComponentFixture<OfferPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
