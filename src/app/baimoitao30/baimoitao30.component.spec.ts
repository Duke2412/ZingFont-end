import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Baimoitao30Component } from './baimoitao30.component';

describe('Baimoitao30Component', () => {
  let component: Baimoitao30Component;
  let fixture: ComponentFixture<Baimoitao30Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Baimoitao30Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Baimoitao30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
