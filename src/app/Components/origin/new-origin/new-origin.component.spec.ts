import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOriginComponent } from './new-origin.component';

describe('NewOriginComponent', () => {
  let component: NewOriginComponent;
  let fixture: ComponentFixture<NewOriginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOriginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
