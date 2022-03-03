import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthUnitsListComponent } from './health-units-list.component';

describe('HealthUnitsListComponent', () => {
  let component: HealthUnitsListComponent;
  let fixture: ComponentFixture<HealthUnitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthUnitsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthUnitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
