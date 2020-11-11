import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaymusicComponent } from './playmusic.component';

describe('PlaymusicComponent', () => {
  let component: PlaymusicComponent;
  let fixture: ComponentFixture<PlaymusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaymusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaymusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
