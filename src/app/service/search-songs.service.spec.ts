import { TestBed } from '@angular/core/testing';

import { SearchSongsService } from './search-songs.service';

describe('SearchSongsService', () => {
  let service: SearchSongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchSongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
