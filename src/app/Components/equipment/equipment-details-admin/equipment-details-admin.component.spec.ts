import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDetailsAdminComponent } from './equipment-details-admin.component';

describe('EquipmentDetailsAdminComponent', () => {
  let component: EquipmentDetailsAdminComponent;
  let fixture: ComponentFixture<EquipmentDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentDetailsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
