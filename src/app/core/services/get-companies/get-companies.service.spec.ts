import { TestBed, inject } from '@angular/core/testing';

import { GetCompaniesService } from './get-companies.service';

describe('GetCompaniesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCompaniesService]
    });
  });

  it('should be created', inject([GetCompaniesService], (service: GetCompaniesService) => {
    expect(service).toBeTruthy();
  }));
});
