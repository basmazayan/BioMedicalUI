import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestAddComponent } from './service-request-add.component';

describe('ServiceRequestAddComponent', () => {
  let component: ServiceRequestAddComponent;
  let fixture: ComponentFixture<ServiceRequestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRequestAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
