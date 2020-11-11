import { TestBed } from '@angular/core/testing';

import { ISongService } from './isong.service';

describe('ISongService', () => {
  let service: ISongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ISongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
