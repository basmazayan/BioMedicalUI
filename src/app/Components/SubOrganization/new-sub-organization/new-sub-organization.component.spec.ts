import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubOrganizationComponent } from './new-sub-organization.component';

describe('NewSubOrganizationComponent', () => {
  let component: NewSubOrganizationComponent;
  let fixture: ComponentFixture<NewSubOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSubOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
