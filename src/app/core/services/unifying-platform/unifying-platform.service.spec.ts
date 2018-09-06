import { TestBed, inject } from '@angular/core/testing';

import { UnifyingPlatformService } from './unifying-platform.service';

describe('UnifyingPlatformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnifyingPlatformService]
    });
  });

  it('should be created', inject([UnifyingPlatformService], (service: UnifyingPlatformService) => {
    expect(service).toBeTruthy();
  }));
});
