import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NghenhieunhatComponent } from './nghenhieunhat.component';

describe('NghenhieunhatComponent', () => {
  let component: NghenhieunhatComponent;
  let fixture: ComponentFixture<NghenhieunhatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NghenhieunhatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NghenhieunhatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
