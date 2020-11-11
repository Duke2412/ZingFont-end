import { TestBed } from '@angular/core/testing';

import { IplaylistService } from './iplaylist.service';

describe('IplaylistService', () => {
  let service: IplaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IplaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
