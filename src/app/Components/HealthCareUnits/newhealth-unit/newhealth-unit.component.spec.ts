import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewhealthUnitComponent } from './newhealth-unit.component';

describe('NewhealthUnitComponent', () => {
  let component: NewhealthUnitComponent;
  let fixture: ComponentFixture<NewhealthUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewhealthUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewhealthUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
