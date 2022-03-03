import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMasterEquipmentComponent } from './new-master-equipment.component';

describe('NewMasterEquipmentComponent', () => {
  let component: NewMasterEquipmentComponent;
  let fixture: ComponentFixture<NewMasterEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMasterEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMasterEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
