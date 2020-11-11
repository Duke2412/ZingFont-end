import { TestBed } from '@angular/core/testing';

import { ShareEventService } from './share-event.service';

describe('ShareEventService', () => {
  let service: ShareEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
