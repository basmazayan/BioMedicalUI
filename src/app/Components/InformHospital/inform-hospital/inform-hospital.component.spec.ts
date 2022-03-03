import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformHospitalComponent } from './inform-hospital.component';

describe('InformHospitalComponent', () => {
  let component: InformHospitalComponent;
  let fixture: ComponentFixture<InformHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
