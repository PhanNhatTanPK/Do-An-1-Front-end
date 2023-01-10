import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInternshipComponent } from './register-internship.component';

describe('RegisterInternshipComponent', () => {
  let component: RegisterInternshipComponent;
  let fixture: ComponentFixture<RegisterInternshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInternshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
