import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLikeComponent } from './top-like.component';

describe('TopLikeComponent', () => {
  let component: TopLikeComponent;
  let fixture: ComponentFixture<TopLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
