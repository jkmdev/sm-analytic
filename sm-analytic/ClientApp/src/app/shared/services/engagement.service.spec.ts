import { TestBed, inject } from '@angular/core/testing';

import { EngagementService } from './engagement.service';

describe('EngagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EngagementService]
    });
  });

  it('should be created', inject([EngagementService], (service: EngagementService) => {
    expect(service).toBeTruthy();
  }));
});
