import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewModeComponent } from './new-mode.component';

describe('NewModeComponent', () => {
  let component: NewModeComponent;
  let fixture: ComponentFixture<NewModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
