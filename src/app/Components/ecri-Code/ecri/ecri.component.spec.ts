import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECRIComponent } from './ecri.component';

describe('ECRIComponent', () => {
  let component: ECRIComponent;
  let fixture: ComponentFixture<ECRIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECRIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECRIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
