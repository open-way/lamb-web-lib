import { TestBed, inject } from '@angular/core/testing';

import { LambWebLibService } from './lamb-web-lib.service';

describe('LambWebLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LambWebLibService]
    });
  });

  it('should be created', inject([LambWebLibService], (service: LambWebLibService) => {
    expect(service).toBeTruthy();
  }));
});
