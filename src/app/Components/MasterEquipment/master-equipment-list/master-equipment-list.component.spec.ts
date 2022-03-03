import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEquipmentListComponent } from './master-equipment-list.component';

describe('MasterEquipmentListComponent', () => {
  let component: MasterEquipmentListComponent;
  let fixture: ComponentFixture<MasterEquipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterEquipmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterEquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
