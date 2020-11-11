import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaimoitaoComponent } from './baimoitao.component';

describe('BaimoitaoComponent', () => {
  let component: BaimoitaoComponent;
  let fixture: ComponentFixture<BaimoitaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaimoitaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaimoitaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
