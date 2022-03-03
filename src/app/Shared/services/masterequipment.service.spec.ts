import { TestBed } from '@angular/core/testing';

import { MasterequipmentService } from './masterequipment.service';

describe('MasterequipmentService', () => {
  let service: MasterequipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterequipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
