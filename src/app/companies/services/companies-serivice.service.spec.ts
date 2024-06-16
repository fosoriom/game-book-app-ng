import { TestBed } from '@angular/core/testing';

import { CompaniesSeriviceService } from './companies-serivice.service';

describe('CompaniesSeriviceService', () => {
  let service: CompaniesSeriviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniesSeriviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
