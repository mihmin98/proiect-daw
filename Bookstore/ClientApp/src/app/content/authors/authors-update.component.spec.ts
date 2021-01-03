import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsUpdateComponent } from './authors-update.component';

describe('AuthorsUpdateComponent', () => {
  let component: AuthorsUpdateComponent;
  let fixture: ComponentFixture<AuthorsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
