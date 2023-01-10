import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerInternComponent } from './manager-intern.component';

describe('ManagerInternComponent', () => {
  let component: ManagerInternComponent;
  let fixture: ComponentFixture<ManagerInternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerInternComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerInternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
