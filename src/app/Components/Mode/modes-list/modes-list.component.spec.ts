import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModesListComponent } from './modes-list.component';

describe('ModesListComponent', () => {
  let component: ModesListComponent;
  let fixture: ComponentFixture<ModesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
