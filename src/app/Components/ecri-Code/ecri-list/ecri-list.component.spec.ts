import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECRIListComponent } from './ecri-list.component';

describe('ECRIListComponent', () => {
  let component: ECRIListComponent;
  let fixture: ComponentFixture<ECRIListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECRIListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECRIListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
