import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCategoryComponent } from './purchase-category.component';

describe('PurchaseCategoryComponent', () => {
  let component: PurchaseCategoryComponent;
  let fixture: ComponentFixture<PurchaseCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
