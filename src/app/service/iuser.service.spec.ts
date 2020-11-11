import { TestBed } from '@angular/core/testing';

import { IuserService } from './iuser.service';

describe('IuserService', () => {
  let service: IuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
