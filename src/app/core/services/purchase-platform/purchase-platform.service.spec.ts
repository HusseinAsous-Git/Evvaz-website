import { TestBed, inject } from '@angular/core/testing';

import { PurchasePlatformService } from './purchase-platform.service';

describe('PurchasePlatformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchasePlatformService]
    });
  });

  it('should be created', inject([PurchasePlatformService], (service: PurchasePlatformService) => {
    expect(service).toBeTruthy();
  }));
});
