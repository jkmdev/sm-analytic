import { TestBed, inject } from '@angular/core/testing';

import { HashtagService } from './hashtag.service';

describe('HashtagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HashtagService]
    });
  });

  it('should be created', inject([HashtagService], (service: HashtagService) => {
    expect(service).toBeTruthy();
  }));
});
