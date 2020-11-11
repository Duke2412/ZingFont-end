import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongbyplaylistComponent } from './songbyplaylist.component';

describe('SongbyplaylistComponent', () => {
  let component: SongbyplaylistComponent;
  let fixture: ComponentFixture<SongbyplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongbyplaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongbyplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
