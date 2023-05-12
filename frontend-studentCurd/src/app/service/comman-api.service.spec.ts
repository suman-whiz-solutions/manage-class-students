import { TestBed } from '@angular/core/testing';

import { CommanApiService } from './comman-api.service';

describe('CommanApiService', () => {
  let service: CommanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
