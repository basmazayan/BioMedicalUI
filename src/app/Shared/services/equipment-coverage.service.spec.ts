import { TestBed } from '@angular/core/testing';

import { EquipmentCoverageService } from './equipment-coverage.service';

describe('EquipmentCoverageService', () => {
  let service: EquipmentCoverageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentCoverageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
