import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsUpdateComponent } from './rentals-update.component';

describe('RentalsUpdateComponent', () => {
  let component: RentalsUpdateComponent;
  let fixture: ComponentFixture<RentalsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
