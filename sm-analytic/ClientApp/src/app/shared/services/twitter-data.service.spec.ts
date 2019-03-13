import { TestBed, inject } from '@angular/core/testing';

import { TwitterDataService } from './twitter-data.service';

describe('TwitterDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwitterDataService]
    });
  });

  it('should be created', inject([TwitterDataService], (service: TwitterDataService) => {
    expect(service).toBeTruthy();
  }));
});
