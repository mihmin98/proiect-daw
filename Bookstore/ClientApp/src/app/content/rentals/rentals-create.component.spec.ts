import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsCreateComponent } from './rentals-create.component';

describe('RentalsCreateComponent', () => {
  let component: RentalsCreateComponent;
  let fixture: ComponentFixture<RentalsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
