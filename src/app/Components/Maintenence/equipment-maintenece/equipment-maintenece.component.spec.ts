import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMainteneceComponent } from './equipment-maintenece.component';

describe('EquipmentMainteneceComponent', () => {
  let component: EquipmentMainteneceComponent;
  let fixture: ComponentFixture<EquipmentMainteneceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentMainteneceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMainteneceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
