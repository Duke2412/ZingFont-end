import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlayListComponent } from './all-play-list.component';

describe('AllPlayListComponent', () => {
  let component: AllPlayListComponent;
  let fixture: ComponentFixture<AllPlayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPlayListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
