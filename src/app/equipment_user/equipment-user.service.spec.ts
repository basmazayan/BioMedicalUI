import { TestBed } from '@angular/core/testing';

import { EquipmentUserService } from './equipment-user.service';

describe('EquipmentUserService', () => {
  let service: EquipmentUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
