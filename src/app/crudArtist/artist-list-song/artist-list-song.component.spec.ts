import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistListSongComponent } from './artist-list-song.component';

describe('ArtistListSongComponent', () => {
  let component: ArtistListSongComponent;
  let fixture: ComponentFixture<ArtistListSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistListSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistListSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
