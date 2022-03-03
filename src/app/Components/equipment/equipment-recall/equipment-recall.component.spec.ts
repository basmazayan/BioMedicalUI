import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentRecallComponent } from './equipment-recall.component';

describe('EquipmentRecallComponent', () => {
  let component: EquipmentRecallComponent;
  let fixture: ComponentFixture<EquipmentRecallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentRecallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentRecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
