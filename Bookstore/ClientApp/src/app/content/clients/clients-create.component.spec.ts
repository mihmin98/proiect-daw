import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCreateComponent } from './clients-create.component';

describe('ClientsCreateComponent', () => {
  let component: ClientsCreateComponent;
  let fixture: ComponentFixture<ClientsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
