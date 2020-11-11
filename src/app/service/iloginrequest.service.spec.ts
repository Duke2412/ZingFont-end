import { TestBed } from '@angular/core/testing';

import { IloginrequestService } from './iloginrequest.service';

describe('IuserService', () => {
  let service: IloginrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IloginrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
