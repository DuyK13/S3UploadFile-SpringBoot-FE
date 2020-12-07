import { TestBed } from '@angular/core/testing';

import { UPLOADAPIService } from './upload-api.service';

describe('UPLOADAPIService', () => {
  let service: UPLOADAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UPLOADAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
