import { TestBed } from '@angular/core/testing';

import { EquipmentUserGuard } from './equipment-user.guard';

describe('EquipmentUserGuard', () => {
  let guard: EquipmentUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EquipmentUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
