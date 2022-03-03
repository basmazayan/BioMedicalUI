import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPriorityComponent } from './new-priority.component';

describe('NewPriorityComponent', () => {
  let component: NewPriorityComponent;
  let fixture: ComponentFixture<NewPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPriorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
