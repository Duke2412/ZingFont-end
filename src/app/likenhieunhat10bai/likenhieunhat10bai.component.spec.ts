import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Likenhieunhat10baiComponent } from './likenhieunhat10bai.component';

describe('Likenhieunhat10baiComponent', () => {
  let component: Likenhieunhat10baiComponent;
  let fixture: ComponentFixture<Likenhieunhat10baiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Likenhieunhat10baiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Likenhieunhat10baiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
