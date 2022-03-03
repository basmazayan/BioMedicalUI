import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdFCreateComponent } from './pd-fcreate.component';

describe('PdFCreateComponent', () => {
  let component: PdFCreateComponent;
  let fixture: ComponentFixture<PdFCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdFCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdFCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
