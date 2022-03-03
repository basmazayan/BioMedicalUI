import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkOrderWithoutRequestComponent } from './add-work-order-without-request.component';

describe('AddWorkOrderWithoutRequestComponent', () => {
  let component: AddWorkOrderWithoutRequestComponent;
  let fixture: ComponentFixture<AddWorkOrderWithoutRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkOrderWithoutRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkOrderWithoutRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
