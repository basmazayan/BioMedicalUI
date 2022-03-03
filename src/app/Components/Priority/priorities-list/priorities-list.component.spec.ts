import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritiesListComponent } from './priorities-list.component';

describe('PrioritiesListComponent', () => {
  let component: PrioritiesListComponent;
  let fixture: ComponentFixture<PrioritiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrioritiesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
