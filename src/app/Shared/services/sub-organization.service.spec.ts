import { TestBed } from '@angular/core/testing';

import { SubOrganizationService } from './sub-organization.service';

describe('SubOrganizationService', () => {
  let service: SubOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
